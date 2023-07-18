CREATE DATABASE translatorapp

CREATE TABLE super_admin_login(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL,
);

CREATE TABLE translar_login(
    id BIGSERIAL PRIMARY KEY,
    translator_name VARCHAR(200) NOT NULL,
    translator_email VARCHAR(300) NOT NULL UNIQUE,
    translator_password VARCHAR(300) NOT NULL
):