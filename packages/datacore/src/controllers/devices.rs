use diesel::SelectableHelper;
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use powerpals_entities::{
    devices::{Device, NewDevice},
    schema::devices,
};
use powerpals_macaddr::HardwareAddress;
use powerpals_tsid::IDClientUser;
use prefixed_tsid::tsid::TSIDDatabaseID;

use crate::error::error::APIError;

pub struct DevicesController;

impl DevicesController {
    pub async fn register_device(
        conn: &mut AsyncPgConnection,
        user_id: TSIDDatabaseID<IDClientUser>,
        hardware_address: HardwareAddress,
    ) -> Result<Device, APIError> {
        let device = NewDevice {
            id: TSIDDatabaseID::random(),
            user_id,
            hardware_address,
        };

        let new_device = diesel::insert_into(devices::table)
            .values(&device)
            .returning(Device::as_returning())
            .get_result(conn)
            .await?;

        Ok(new_device)
    }
}
