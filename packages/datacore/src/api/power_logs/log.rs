use axum::{Json, extract::State};
use oasgen::{OaSchema, oasgen};
use powerpals_tsid::IDDevice;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Deserialize;

use crate::{controllers::power_logs::PowerLogsController, db::Pool, error::error::APIError};

#[derive(Deserialize, OaSchema)]
pub struct LogPowerRequest {
    pub device_id: TSIDDatabaseID<IDDevice>,
    pub power_watts: f64,
}

/// Logs a power consumption event.
#[oasgen]
pub async fn api_power_logs_log(
    State(pool): State<Pool>,
    Json(data): Json<LogPowerRequest>,
) -> Result<(), APIError> {
    let mut db = pool.get().await?;
    PowerLogsController::log(&mut db, data.device_id, data.power_watts).await?;
    Ok(())
}
