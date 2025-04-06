use chrono::{Duration, Utc};
use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, SelectableHelper};
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use itertools::Itertools;
use powerpals_entities::{
    client_users::ClientUser,
    power_logs::{NewPowerLog, PowerLog},
    prelude::power_logs_dsl,
    schema::{client_users, devices, power_logs},
};
use powerpals_tsid::{IDClientUser, IDDepartment, IDDevice};
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::{api_entities::power_logs::UsageByUser, error::error::APIError};

pub struct PowerLogsController;

impl PowerLogsController {
    pub async fn log(
        conn: &mut AsyncPgConnection,
        device_id: TSIDDatabaseID<IDDevice>,
        power_watts: f64,
    ) -> Result<(), APIError> {
        let new_log = NewPowerLog {
            device_id,
            power_watts,
        };

        diesel::insert_into(power_logs::table)
            .values(&new_log)
            .execute(conn)
            .await?;

        Ok(())
    }

    pub async fn get_latest_for_user(
        conn: &mut AsyncPgConnection,
        user_id: TSIDDatabaseID<IDClientUser>,
    ) -> Result<Option<PowerLog>, APIError> {
        let log = power_logs_dsl
            .inner_join(devices::table)
            .filter(devices::user_id.eq(user_id))
            .order(power_logs::time.desc())
            .limit(1)
            .select(PowerLog::as_select())
            .get_result(conn)
            .await
            .optional()?;

        Ok(log)
    }

    fn calculate_watt_hours(logs: &[PowerLog]) -> f64 {
        let mut total_watt_hours = 0_f64;
        for (index, log) in logs.iter().enumerate() {
            if index == logs.len() - 1 {
                continue;
            }

            let time_diff = logs[index + 1].time - log.time;
            let avg_power = (logs[index + 1].power_watts + log.power_watts) / 2_f64;
            let num_hours = time_diff.num_seconds() as f64 / 60_f64 / 60_f64;
            total_watt_hours += num_hours * avg_power;
        }

        total_watt_hours
    }

    pub async fn get_total_for_user(
        conn: &mut AsyncPgConnection,
        user_id: TSIDDatabaseID<IDClientUser>,
    ) -> Result<f64, APIError> {
        let logs = power_logs_dsl
            .inner_join(devices::table)
            .filter(devices::user_id.eq(user_id))
            .order(power_logs::time.asc())
            .select(PowerLog::as_select())
            .get_results(conn)
            .await?;

        Ok(Self::calculate_watt_hours(&logs))
    }

    pub async fn get_totals_in_dept(
        conn: &mut AsyncPgConnection,
        dept_id: TSIDDatabaseID<IDDepartment>,
    ) -> Result<Vec<UsageByUser>, APIError> {
        let logs: Vec<(PowerLog, ClientUser)> = power_logs_dsl
            .inner_join(devices::table.inner_join(client_users::table))
            .filter(client_users::department_id.eq(dept_id))
            .filter(power_logs::time.gt(Utc::now() - Duration::days(7)))
            .order(power_logs::time.asc())
            .select((PowerLog::as_select(), ClientUser::as_select()))
            .get_results(conn)
            .await?;

        let mut usages: Vec<UsageByUser> = Vec::new();
        let log_chunks = logs
            .into_iter()
            .chunk_by(|(_, u)| (u.id, u.username.clone()));
        for chunk in &log_chunks {
            let logs: Vec<PowerLog> = chunk.1.map(|(i, _)| i).collect();
            let hours = Self::calculate_watt_hours(&logs);

            usages.push(UsageByUser {
                user_id: chunk.0.0,
                user_username: chunk.0.1,
                usage_watt_hours: hours,
            });
        }

        Ok(usages)
    }
}
