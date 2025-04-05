use chrono::{DateTime, Utc};
use diesel::prelude::*;
use powerpals_tsid::IDDevice;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::power_logs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct PowerLog {
    pub time: DateTime<Utc>,
    pub device_id: TSIDDatabaseID<IDDevice>,
    pub power_watts: f64,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::power_logs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewPowerLog {
    pub device_id: TSIDDatabaseID<IDDevice>,
    pub power_watts: f64,
}
