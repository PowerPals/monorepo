use diesel::{dsl::sum, prelude::*};
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
        let sum: Option<f64> = power_logs_dsl
            .inner_join(devices::table)
            .filter(devices::user_id.eq(user_id))
            .select(sum(power_logs::power_watts))
            .get_result(conn)
            .await?;

        Ok(sum.unwrap_or(0_f64))
    }
}
