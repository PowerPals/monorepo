use api::{devices::register::api_devices_register, health::api_health, users::get::api_users_get};
use axum::Router;
use config::Config;
use diesel_async::pooled_connection::{AsyncDieselConnectionManager, bb8::Pool};
use oasgen::Server;

mod api;
mod config;
mod controllers;
mod db;
mod error;

#[tokio::main]
pub async fn main() {
    let config = Config::parse_config();
    let db_manager = AsyncDieselConnectionManager::<diesel_async::AsyncPgConnection>::new(
        config.database_url.clone(),
    );
    let db_pool = Pool::builder().build(db_manager).await.unwrap();

    let server = Server::axum()
        .get("/healthz", api_health)
        .get("/users/{user_id}", api_users_get)
        .post("/devices", api_devices_register)
        .route_json_spec("/openapi.json")
        .freeze();

    let app = Router::new()
        .merge(server.into_router())
        .with_state(db_pool)
        .with_state(config);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
