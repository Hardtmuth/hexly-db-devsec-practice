CREATE OR REPLACE FUNCTION search_users(name_pattern TEXT) -- TODO check this
RETURNS TABLE(id INT, name TEXT, email TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name, u.email
  FROM users u
  WHERE u.name LIKE '%' || name_pattern || '%';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_by_id(user_id INT) -- TODO check this
RETURNS TABLE(id INT, name TEXT, login TEXT, email TEXT, password TEXT, created_at TIMESTAMP) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name::TEXT, u.login::TEXT, u.email::TEXT, u.password::TEXT, u.created_at
  FROM securelog.users u
  WHERE u.id = user_id;
END;
$$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION recent_logs(user_id INT) -- TODO rewrite this
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user(p_name TEXT, p_login TEXT, p_email TEXT, p_password TEXT) -- TODO rewrite this
RETURNS VOID AS $$
BEGIN
  INSERT INTO securelog.users(name, login, email, password)
  VALUES (p_name, p_login, p_email, p_password);
END;
$$ LANGUAGE plpgsql;