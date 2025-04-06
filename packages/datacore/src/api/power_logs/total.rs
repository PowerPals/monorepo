use axum::{
    Json,
    extract::{Path, State},
};
use oasgen::oasgen;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::{controllers::power_logs::PowerLogsController, db::Pool, error::error::APIError};

/// Calculates the sum total of all the power consumed by a user ever, in "Watt hours" (Wh).
#[oasgen]
pub async fn api_power_logs_total(
    State(pool): State<Pool>,
    Path(user_id): Path<TSIDDatabaseID<IDClientUser>>,
) -> Result<Json<f64>, APIError> {
    let mut conn = pool.get().await?;
    let total = PowerLogsController::get_total_for_user(&mut conn, user_id).await?;
    Ok(Json(total))
}
