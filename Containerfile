FROM docker.io/rust:1-slim-bookworm as builder

RUN apt-get update
RUN apt-get install -y libssl-dev pkg-config libpq-dev

WORKDIR /usr/src/powerpals
COPY packages/datacore packages/datacore
COPY packages/entities packages/entities
COPY packages/migration packages/migration
COPY packages/tsid packages/tsid
COPY packages/macaddr packages/macaddr
COPY Cargo.toml Cargo.lock ./

RUN cargo install --path packages/datacore --profile release

FROM docker.io/debian:bookworm-slim
RUN apt-get update
RUN apt-get install -y libssl-dev pkg-config ca-certificates libpq-dev
RUN update-ca-certificates

COPY --from=builder /usr/local/cargo/bin/powerpals-datacore /opt/powerpals-datacore

CMD ["/opt/powerpals-datacore"]
