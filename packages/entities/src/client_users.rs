use chrono::{DateTime, Utc};
use diesel::prelude::*;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::client_users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ClientUser {
    pub id: TSIDDatabaseID<IDClientUser>,
    pub username: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
