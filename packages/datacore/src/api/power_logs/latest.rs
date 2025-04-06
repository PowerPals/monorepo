use axum::{
    Json,
    extract::{Path, State},
};
use oasgen::oasgen;
use powerpals_entities::power_logs::PowerLog;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::{controllers::power_logs::PowerLogsController, db::Pool, error::error::APIError};

#[oasgen]
pub async fn api_power_logs_latest(
    State(pool): State<Pool>,
    Path(user_id): Path<TSIDDatabaseID<IDClientUser>>,
) -> Result<Json<Option<PowerLog>>, APIError> {
    let mut conn = pool.get().await?;
    let log = PowerLogsController::get_latest_for_user(&mut conn, user_id).await?;
    Ok(Json(log))
}
