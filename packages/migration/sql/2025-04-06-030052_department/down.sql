-- This file should undo anything in `up.sql`

alter table client_users drop column department_id;
drop table departments;
