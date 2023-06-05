CREATE TABLE IF NOT EXISTS users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE
);

INSERT INTO users (login, password, age)
VALUES
    ('user1', 'password1', 10),
    ('user2', 'password2', 20),
    ('user3', 'password3', 30);

DROP TYPE IF EXISTS permissions_type;
CREATE TYPE permissions_type AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE IF NOT EXISTS groups
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    permissions permissions_type ARRAY NOT NULL
);

INSERT INTO groups (name, permissions)
VALUES
    ('users', '{READ, SHARE}'),
    ('admins', '{READ, WRITE, SHARE, UPLOAD_FILES}'),
    ('superadmins', '{READ, WRITE, DELETE, SHARE, UPLOAD_FILES}');