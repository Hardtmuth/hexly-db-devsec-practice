CREATE OR REPLACE FUNCTION search_users(name_pattern TEXT) -- TODO check this
RETURNS TABLE(id INT, name TEXT, email TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name::TEXT, u.email::TEXT
  FROM users u
  WHERE u.name LIKE '%' || name_pattern || '%';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_by_id(user_id INT) -- TODO check this
RETURNS TABLE(id INT, name TEXT, login TEXT, email TEXT, password TEXT, created_at TIMESTAMP) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name::TEXT, u.login::TEXT, u.email::TEXT, u.password::TEXT, u.created_at
  FROM users u
  WHERE u.id = user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user(p_name TEXT, p_login TEXT, p_email TEXT, p_password TEXT)
RETURNS TABLE(id INT, name TEXT, login TEXT, email TEXT, password TEXT) AS $$
BEGIN
  RETURN QUERY
  INSERT INTO users (name, login, email, password)
  VALUES (p_name, p_login, p_email, p_password)
  ON CONFLICT ON CONSTRAINT unique_login_email DO NOTHING
  RETURNING users.id::INT, users.name::TEXT, users.login::TEXT, users.email::TEXT, users.password::TEXT;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::INT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO log (operation_type, operation_time, user_id, details)
  VALUES (TG_OP, NOW(), NEW.id, row_to_json(NEW));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER logger
AFTER INSERT OR UPDATE ON users
FOR EACH ROW  -- TODO - Rewrite to STATEMENT
EXECUTE FUNCTION log_changes();

CREATE OR REPLACE FUNCTION recent_logs(p_user_id INT)
RETURNS TABLE(
  operation_type TEXT,
  operation_time TIMESTAMP,
  user_id INT,
  details JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.operation_type::TEXT,
    l.operation_time,
    l.user_id,
    l.details
  FROM log l
  WHERE l.user_id = p_user_id
  ORDER BY l.log_id DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;