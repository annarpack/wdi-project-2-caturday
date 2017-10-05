DROP DATABASE IF EXISTS caturday_db;
CREATE DATABASE caturday_db;
\c caturday_db

DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255),
  series INTEGER
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  thread_id VARCHAR NOT NULL
);
