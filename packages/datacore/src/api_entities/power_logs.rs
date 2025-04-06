use oasgen::OaSchema;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

#[derive(Serialize, OaSchema)]
pub struct UsageByUser {
    pub user_id: TSIDDatabaseID<IDClientUser>,
    pub user_username: String,
    pub usage_watt_hours: f64,
}
