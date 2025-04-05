use std::env;

use diesel::{Connection, PgConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./sql");

fn main() {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL to be specified");
    let mut conn = PgConnection::establish(&database_url).expect("Connection to database");

    conn.run_pending_migrations(MIGRATIONS).expect("migrations");
}
