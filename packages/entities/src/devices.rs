use chrono::{DateTime, Utc};
use diesel::prelude::*;
use oasgen::OaSchema;
use powerpals_macaddr::HardwareAddress;
use powerpals_tsid::{IDClientUser, IDDevice};
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize, OaSchema)]
#[diesel(table_name = crate::schema::devices)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Device {
    pub id: TSIDDatabaseID<IDDevice>,
    pub user_id: TSIDDatabaseID<IDClientUser>,
    pub hardware_address: HardwareAddress,
    pub created_at: DateTime<Utc>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::devices)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewDevice {
    pub id: TSIDDatabaseID<IDDevice>,
    pub user_id: TSIDDatabaseID<IDClientUser>,
    pub hardware_address: HardwareAddress,
}
