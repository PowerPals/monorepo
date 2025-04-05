use std::fmt::Display;

use anyhow::anyhow;
use diesel::{
    deserialize::{FromSql, FromSqlRow},
    expression::AsExpression,
    pg::Pg,
    serialize::ToSql,
    sql_types::MacAddr,
};
use mac_address::MacAddress;
use serde::Serialize;

#[derive(Debug, Clone, Serialize, FromSqlRow, AsExpression)]
#[diesel(sql_type=diesel::sql_types::MacAddr)]
pub struct HardwareAddress(MacAddress);

impl From<MacAddress> for HardwareAddress {
    fn from(value: MacAddress) -> Self {
        Self(value)
    }
}

impl FromSql<MacAddr, Pg> for HardwareAddress {
    fn from_sql(
        bytes: <Pg as diesel::backend::Backend>::RawValue<'_>,
    ) -> diesel::deserialize::Result<Self> {
        let arr = <[u8; 6]>::try_from(bytes.as_bytes())
            .map_err(|e| anyhow!("parse mac address: {}", e.to_string()))?;
        Ok(MacAddress::from(arr).into())
    }
}

impl ToSql<MacAddr, Pg> for HardwareAddress {
    fn to_sql<'b>(
        &'b self,
        out: &mut diesel::serialize::Output<'b, '_, Pg>,
    ) -> diesel::serialize::Result {
        let val = self.0.to_owned();
        <[u8; 6] as ToSql<MacAddr, Pg>>::to_sql(&val.bytes(), &mut out.reborrow())
    }
}

impl Display for HardwareAddress {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}
