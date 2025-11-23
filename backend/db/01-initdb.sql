SET client_encoding = 'UTF8';

CREATE USER admin_user WITH PASSWORD 'admin_user_strong_password';
CREATE USER readonly_user WITH PASSWORD 'readonly_user_strong_password';

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin_user;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ADD CONSTRAINT unique_login_email UNIQUE (login, email);

INSERT INTO users (name, login, email, password)
VALUES
    ('Иван Иванов', 'i.ivanov', 'ivan@example.com', 'qwerty'),
    ('Мария Петрова', 'm.petrova', 'maria@example.com', 'asdfg')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS log (
    log_id SERIAL PRIMARY KEY,
    operation_type VARCHAR(10),
    operation_time TIMESTAMP,
    user_id INT,
    details JSONB
);
