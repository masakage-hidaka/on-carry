/*
  # Add Social Authentication and WhatsApp Support

  1. Changes to Existing Tables
    - `user_profiles` table
      - Add `whatsapp_number` field for emergency support contact
      - Add `profile_picture_url` for social profile images
      - Add `provider` field to track authentication method
      
  2. Security
    - Update RLS policies to allow users to update their own WhatsApp info
    - Maintain existing security policies

  3. Notes
    - Supabase Auth automatically handles OAuth providers (Google, Facebook, etc.)
    - OAuth tokens and provider info are stored in auth.users table
    - We only need to extend user_profiles for additional custom data
*/

-- Add new columns to user_profiles for social auth and WhatsApp
DO $$
BEGIN
  -- Add WhatsApp number field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'whatsapp_number'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN whatsapp_number text;
  END IF;

  -- Add profile picture URL (from social login)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'profile_picture_url'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN profile_picture_url text;
  END IF;

  -- Add provider field to track authentication method
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'auth_provider'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN auth_provider text DEFAULT 'email';
  END IF;
END $$;

-- Update RLS policy to allow users to update their WhatsApp and profile picture
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index for faster WhatsApp lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_whatsapp 
  ON user_profiles(whatsapp_number) 
  WHERE whatsapp_number IS NOT NULL;

-- Create index for provider lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_provider 
  ON user_profiles(auth_provider);

-- Function to sync user profile with auth metadata
CREATE OR REPLACE FUNCTION sync_user_profile_with_auth()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- When a user signs up via OAuth, create their profile
  INSERT INTO user_profiles (
    id,
    full_name,
    profile_picture_url,
    auth_provider
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    profile_picture_url = COALESCE(EXCLUDED.profile_picture_url, user_profiles.profile_picture_url),
    auth_provider = COALESCE(EXCLUDED.auth_provider, user_profiles.auth_provider);
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically sync profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_profile_with_auth();
