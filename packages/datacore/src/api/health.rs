use axum::Json;
use oasgen::oasgen;

#[oasgen]
pub async fn api_health() -> Json<String> {
    Json("Okay!".to_string())
}
