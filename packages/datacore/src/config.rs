use std::env;

use figment::{
    Figment,
    providers::{Format, Toml},
};
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
    pub database_url: String,
}

impl Config {
    pub fn parse_config() -> Config {
        let mut f = Figment::new();

        let config_path = env::var("PAL_CONFIG_PATH");
        if let Ok(config_path) = config_path {
            f = f.merge(Toml::file(config_path));
        }

        f.extract().unwrap()
    }
}
