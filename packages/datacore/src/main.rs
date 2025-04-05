use api::health::api_health;
use axum::Router;
use oasgen::Server;

mod api;

#[tokio::main]
pub async fn main() {
    let server = Server::axum()
        .get("/healthz", api_health)
        .route_json_spec("/openapi.json")
        .freeze();
    let app = Router::new().merge(server.into_router());

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
