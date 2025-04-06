use axum::{
    Json,
    extract::{Path, State},
};
use oasgen::oasgen;
use powerpals_tsid::IDDepartment;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::{
    api_entities::power_logs::UsageByUser, controllers::power_logs::PowerLogsController, db::Pool,
    error::error::APIError,
};

#[oasgen]
pub async fn api_power_logs_recent_in_dept(
    State(pool): State<Pool>,
    Path(department_id): Path<TSIDDatabaseID<IDDepartment>>,
) -> Result<Json<Vec<UsageByUser>>, APIError> {
    let mut conn = pool.get().await?;
    let usages = PowerLogsController::get_totals_in_dept(&mut conn, department_id).await?;
    Ok(Json(usages))
}
