use std::fmt::Display;

use axum::{http::StatusCode, response::IntoResponse};
use bb8::RunError;
use diesel_async::pooled_connection::PoolError;

#[derive(Clone)]
pub struct APIError {
    msg: String,
    status: StatusCode,
}

impl Display for APIError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.msg)
    }
}

impl IntoResponse for APIError {
    fn into_response(self) -> axum::response::Response {
        (self.status, self.msg).into_response()
    }
}

impl APIError {
    pub fn not_found() -> Self {
        Self {
            msg: "Not found".to_string(),
            status: StatusCode::NOT_FOUND,
        }
    }
}

impl From<RunError<PoolError>> for APIError {
    fn from(value: RunError<PoolError>) -> Self {
        Self {
            msg: value.to_string(),
            status: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl From<diesel::result::Error> for APIError {
    fn from(value: diesel::result::Error) -> Self {
        Self {
            msg: value.to_string(),
            status: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}
