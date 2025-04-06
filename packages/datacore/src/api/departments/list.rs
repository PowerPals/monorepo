use axum::{Json, extract::State};
use oasgen::oasgen;
use powerpals_entities::departments::Department;

use crate::{controllers::departments::DepartmentsController, db::Pool, error::error::APIError};

/// List all the departments in the organisation. They are returned in no particular order.
#[oasgen]
pub async fn api_departments_list(
    State(pool): State<Pool>,
) -> Result<Json<Vec<Department>>, APIError> {
    let mut conn = pool.get().await?;
    let depts = DepartmentsController::list(&mut conn).await?;
    Ok(Json(depts))
}
