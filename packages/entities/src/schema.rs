// @generated automatically by Diesel CLI.

diesel::table! {
    client_users (id) {
        id -> Int8,
        username -> Varchar,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    devices (id) {
        id -> Int8,
        user_id -> Int8,
        hardware_address -> Macaddr,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    power_logs (time) {
        device_id -> Int8,
        power_watts -> Float8,
        time -> Timestamptz,
    }
}

diesel::joinable!(devices -> client_users (user_id));
diesel::joinable!(power_logs -> devices (device_id));

diesel::allow_tables_to_appear_in_same_query!(
    client_users,
    devices,
    power_logs,
);
