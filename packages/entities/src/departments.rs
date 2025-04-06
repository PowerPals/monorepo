use diesel::prelude::*;
use oasgen::OaSchema;
use powerpals_tsid::IDDepartment;
use prefixed_tsid::tsid::TSIDDatabaseID;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize, OaSchema)]
#[diesel(table_name = crate::schema::departments)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Department {
    pub id: TSIDDatabaseID<IDDepartment>,
    pub name: String,
}
