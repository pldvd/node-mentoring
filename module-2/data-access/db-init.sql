DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE
);

-- passwords are hashed values of password1, password2, password3
INSERT INTO users (login, password, age)
VALUES
    ('user1', '$2b$10$qqbGNEDy6eFJlu5YxYZCDOINlc4Uu1K.1bHUHWMr7atZHEfzXEQLy', 10),
    ('user2', '$2b$10$O5g1pVhpXKwfx/FKUpCd/eeilJWceNWeRaWCjTNv6KIysuj10dQKy', 20),
    ('user3', '$2b$10$fykwswTGm2zcS8W.tX9PAu0rM38WQNsg9r29UwafVxhda/aiOP1F2', 30);

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

DROP TABLE IF EXISTS usergroups;
CREATE TABLE IF NOT EXISTS usergroups
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    "groupId" INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usergroups ("groupId", "userId")
VALUES
    (1, 2),
    (1, 1),
    (1,3),
    (2,3),
    (2,1),
    (3,2)
    ;