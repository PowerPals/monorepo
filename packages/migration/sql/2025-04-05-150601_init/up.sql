-- Your SQL goes here

CREATE OR REPLACE FUNCTION diesel_manage_updated_at(_tbl regclass) RETURNS VOID AS $$
BEGIN
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %s
                    FOR EACH ROW EXECUTE PROCEDURE diesel_set_updated_at()', _tbl);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION diesel_set_updated_at() RETURNS trigger AS $$
BEGIN
    IF (
        NEW IS DISTINCT FROM OLD AND
        NEW.updated_at IS NOT DISTINCT FROM OLD.updated_at
    ) THEN
        NEW.updated_at := current_timestamp;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE client_users (
    id bigint PRIMARY KEY,
    username varchar not null unique,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

SELECT
    diesel_manage_updated_at('client_users');

CREATE TABLE devices (
    id bigint PRIMARY KEY,
    user_id bigint not null references client_users(id) on delete cascade,
    hardware_address macaddr not null,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE power_logs (
    device_id bigint not null references devices(id) on delete cascade,
    power_watts double precision not null,
    time TIMESTAMP WITH TIME ZONE primary key DEFAULT NOW()
);

SELECT create_hypertable('power_logs', by_range('time'));
