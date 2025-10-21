/*
  # Create Initial Admin User Setup

  1. Purpose
    - Provides instructions and helper function for creating admin users
    - Admin users must be created through Supabase Auth first
    - Then their role must be set to 'admin' in user_profiles

  2. Instructions for Creating Admin User
    - Use Supabase Dashboard or signUp to create a user
    - Then run: SELECT set_user_as_admin('<user_email>');
    
  3. New Functions
    - `set_user_as_admin(user_email)` - Sets a user's role to admin
    - `get_admin_users()` - Lists all admin users
*/

-- Function to set a user as admin by email
CREATE OR REPLACE FUNCTION set_user_as_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get user ID from auth.users
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;

  -- Insert or update user_profiles to set role as admin
  INSERT INTO user_profiles (id, role, full_name)
  VALUES (target_user_id, 'admin', 'Admin User')
  ON CONFLICT (id) 
  DO UPDATE SET role = 'admin';

  RAISE NOTICE 'User % has been set as admin', user_email;
END;
$$;

-- Function to list all admin users
CREATE OR REPLACE FUNCTION get_admin_users()
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    au.email,
    up.full_name,
    up.created_at
  FROM user_profiles up
  JOIN auth.users au ON up.id = au.id
  WHERE up.role = 'admin'
  ORDER BY up.created_at;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION set_user_as_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_users() TO authenticated;
