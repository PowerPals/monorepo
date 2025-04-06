use diesel::{QueryDsl, SelectableHelper};
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use powerpals_entities::{departments::Department, prelude::departments_dsl};

use crate::error::error::APIError;

pub struct DepartmentsController;

impl DepartmentsController {
    pub async fn list(conn: &mut AsyncPgConnection) -> Result<Vec<Department>, APIError> {
        departments_dsl
            .select(Department::as_select())
            .get_results(conn)
            .await
            .map_err(From::from)
    }
}
