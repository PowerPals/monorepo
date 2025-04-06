-- Your SQL goes here

create table departments (
  id bigint primary key,
  name varchar not null unique
);

alter table client_users add column department_id bigint not null references departments(id) on delete cascade;
