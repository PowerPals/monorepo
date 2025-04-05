use diesel::{OptionalExtension, QueryDsl, SelectableHelper};
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use powerpals_entities::{client_users::ClientUser, prelude::client_users_dsl};
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::error::error::APIError;

pub struct UsersController;

impl UsersController {
    pub async fn get_user(
        conn: &mut AsyncPgConnection,
        id: TSIDDatabaseID<IDClientUser>,
    ) -> Result<Option<ClientUser>, APIError> {
        client_users_dsl
            .find(id)
            .select(ClientUser::as_select())
            .get_result(conn)
            .await
            .optional()
            .map_err(From::from)
    }
}
