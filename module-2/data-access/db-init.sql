CREATE TABLE IF NOT EXISTS Users
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "login" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE
);

INSERT INTO users ("login", "password", "age")
VALUES
    ('user1', 'password1', 10),
    ('user2', 'password2', 20),
    ('user3', 'password3', 30);