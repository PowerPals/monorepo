use diesel::Connection;
use diesel_async::{AsyncPgConnection, pooled_connection::AsyncDieselConnectionManager};
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

use crate::config::Config;

pub type Pool = bb8::Pool<AsyncDieselConnectionManager<AsyncPgConnection>>;

const MIGRATIONS: EmbeddedMigrations = embed_migrations!("../migration/sql/");
pub async fn run_migrations(config: &Config) {
    let database_url = config.database_url.clone();
    tokio::task::spawn_blocking(move || {
        let mut conn =
            diesel::PgConnection::establish(&database_url).expect("Connect to DB for migrations");

        conn.run_pending_migrations(MIGRATIONS)
            .expect("Run migrations");
    })
    .await
    .unwrap();
}
