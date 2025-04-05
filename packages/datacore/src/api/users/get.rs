use axum::{
    Json,
    extract::{Path, State},
};
use oasgen::oasgen;
use powerpals_entities::client_users::ClientUser;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::{controllers::users::UsersController, db::Pool, error::error::APIError};

#[oasgen]
pub async fn api_users_get(
    State(pool): State<Pool>,
    Path(user_id): Path<TSIDDatabaseID<IDClientUser>>,
) -> Result<Json<ClientUser>, APIError> {
    let mut db = pool.get().await?;
    let user = UsersController::get_user(&mut db, user_id)
        .await?
        .ok_or(APIError::not_found())?;

    Ok(Json(user))
}
