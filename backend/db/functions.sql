CREATE OR REPLACE FUNCTION search_users(name_pattern TEXT)
RETURNS TABLE(id INT, name TEXT, email TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT id, name, email
  FROM search_users
  WHERE name LIKE '%' || name_pattern || '%';
END;
$$ LANGUAGE plpgsql;