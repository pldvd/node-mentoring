DROP TABLE IF EXISTS users CASCADE;
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

DROP TABLE IF EXISTS groups;
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

DROP TABLE IF EXISTS usergroup;
CREATE TABLE IF NOT EXISTS usergroup
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    groupId INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usergroup (groupId, userId)
VALUES
    (1, 2),
    (1, 1),
    (1,3),
    (2,3),
    (2,1),
    (3,2)
    ;