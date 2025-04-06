use chrono::{DateTime, Utc};
use diesel::prelude::*;
use oasgen::OaSchema;
use powerpals_tsid::IDDevice;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

use crate::client_users::ClientUser;

#[derive(Queryable, Selectable, Serialize, OaSchema)]
#[diesel(table_name = crate::schema::power_logs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct PowerLog {
    pub time: DateTime<Utc>,
    pub device_id: TSIDDatabaseID<IDDevice>,
    pub power_watts: f64,
}

pub struct PowerLogWithUser {
    pub log: PowerLog,
    pub user: ClientUser,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::power_logs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewPowerLog {
    pub device_id: TSIDDatabaseID<IDDevice>,
    pub power_watts: f64,
}
