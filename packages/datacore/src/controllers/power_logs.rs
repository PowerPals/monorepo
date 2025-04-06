use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use powerpals_entities::{
    power_logs::{NewPowerLog, PowerLog},
    prelude::power_logs_dsl,
    schema::{devices, power_logs},
};
use powerpals_tsid::{IDClientUser, IDDevice};
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::error::error::APIError;

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

        Ok(total_watt_hours)
    }
}
