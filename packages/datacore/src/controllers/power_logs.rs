use diesel_async::{AsyncPgConnection, RunQueryDsl};
use powerpals_entities::{power_logs::NewPowerLog, schema::power_logs};
use powerpals_tsid::IDDevice;
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
}
