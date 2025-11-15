SET client_encoding = 'UTF8';

CREATE SCHEMA IF NOT EXISTS securelog;

CREATE TABLE IF NOT EXISTS securelog.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO securelog.users (name, login, email, password) VALUES
('Иван Иванов', 'i.ivanov', 'ivan@example.com', 'qwerty'),
('Мария Петрова', 'm.petrova', 'maria@example.com', 'asdfg')
ON CONFLICT DO NOTHING;
