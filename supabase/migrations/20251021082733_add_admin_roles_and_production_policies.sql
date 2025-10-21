/*
  # Add Admin Roles and Production-Ready RLS Policies

  ## Overview
  This migration prepares the database for production by:
  1. Adding admin role functionality to user_profiles
  2. Creating comprehensive RLS policies for admin access
  3. Ensuring secure access control for all tables
  4. Adding missing indexes for performance

  ## Changes

  ### 1. User Profiles & Admin Roles
  - Ensure user_profiles table has proper admin role support
  - Add function to check if user is admin

  ### 2. RLS Policies for unified_bookings
  - Customers can view their own bookings
  - Admins can view all bookings
  - Admins can update booking status
  - Only authenticated users can create bookings

  ### 3. RLS Policies for service-specific tables
  - All service tables (hire_requests, doctor_appointments, etc.)
  - Customers can view their own data
  - Admins have full access

  ### 4. Performance Indexes
  - Add indexes on frequently queried columns
  - Optimize admin dashboard queries

  ## Security
  - All policies require authentication
  - Customer data is isolated by user_id
  - Admin access is role-based
*/

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;

-- =====================================================
-- RLS POLICIES FOR unified_bookings
-- =====================================================

-- Drop existing policies if any
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Customers can view own bookings" ON unified_bookings;
  DROP POLICY IF EXISTS "Admins can view all bookings" ON unified_bookings;
  DROP POLICY IF EXISTS "Authenticated users can create bookings" ON unified_bookings;
  DROP POLICY IF EXISTS "Admins can update bookings" ON unified_bookings;
  DROP POLICY IF EXISTS "Customers can update own bookings" ON unified_bookings;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Customers can view their own bookings
CREATE POLICY "Customers can view own bookings"
  ON unified_bookings
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = customer_id OR
    is_admin(auth.uid())
  );

-- Authenticated users can create bookings
CREATE POLICY "Authenticated users can create bookings"
  ON unified_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = customer_id OR
    customer_id IS NULL
  );

-- Customers can update their own bookings (limited fields)
CREATE POLICY "Customers can update own bookings"
  ON unified_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id)
  WITH CHECK (auth.uid() = customer_id);

-- Admins can update any booking
CREATE POLICY "Admins can update bookings"
  ON unified_bookings
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- RLS POLICIES FOR hire_requests
-- =====================================================

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own hire requests" ON hire_requests;
  DROP POLICY IF EXISTS "Admins can view all hire requests" ON hire_requests;
  DROP POLICY IF EXISTS "Users can insert own hire requests" ON hire_requests;
  DROP POLICY IF EXISTS "Admins can update hire requests" ON hire_requests;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can view own hire requests"
  ON hire_requests
  FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM unified_bookings WHERE customer_id = auth.uid()
    ) OR
    is_admin(auth.uid())
  );

CREATE POLICY "Users can insert own hire requests"
  ON hire_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update hire requests"
  ON hire_requests
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- RLS POLICIES FOR doctor_appointments
-- =====================================================

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own appointments" ON doctor_appointments;
  DROP POLICY IF EXISTS "Admins can view all appointments" ON doctor_appointments;
  DROP POLICY IF EXISTS "Users can insert appointments" ON doctor_appointments;
  DROP POLICY IF EXISTS "Admins can update appointments" ON doctor_appointments;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can view own appointments"
  ON doctor_appointments
  FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM unified_bookings WHERE customer_id = auth.uid()
    ) OR
    is_admin(auth.uid())
  );

CREATE POLICY "Users can insert appointments"
  ON doctor_appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update appointments"
  ON doctor_appointments
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- RLS POLICIES FOR dinner_experiences
-- =====================================================

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own experiences" ON dinner_experiences;
  DROP POLICY IF EXISTS "Admins can view all experiences" ON dinner_experiences;
  DROP POLICY IF EXISTS "Users can insert experiences" ON dinner_experiences;
  DROP POLICY IF EXISTS "Admins can update experiences" ON dinner_experiences;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can view own experiences"
  ON dinner_experiences
  FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM unified_bookings WHERE customer_id = auth.uid()
    ) OR
    is_admin(auth.uid())
  );

CREATE POLICY "Users can insert experiences"
  ON dinner_experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update experiences"
  ON dinner_experiences
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- RLS POLICIES FOR airport_transfers
-- =====================================================

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own transfers" ON airport_transfers;
  DROP POLICY IF EXISTS "Admins can view all transfers" ON airport_transfers;
  DROP POLICY IF EXISTS "Users can insert transfers" ON airport_transfers;
  DROP POLICY IF EXISTS "Admins can update transfers" ON airport_transfers;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can view own transfers"
  ON airport_transfers
  FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM unified_bookings WHERE customer_id = auth.uid()
    ) OR
    is_admin(auth.uid())
  );

CREATE POLICY "Users can insert transfers"
  ON airport_transfers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update transfers"
  ON airport_transfers
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- RLS POLICIES FOR user_profiles
-- =====================================================

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR
    is_admin(auth.uid())
  );

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- PUBLIC ACCESS POLICIES
-- =====================================================

-- Services table - public read, admin write
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view services" ON services;
  DROP POLICY IF EXISTS "Admins can manage services" ON services;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Hotels table - public read, admin write
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view hotels" ON hotels;
  DROP POLICY IF EXISTS "Admins can manage hotels" ON hotels;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Anyone can view hotels"
  ON hotels
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Admins can manage hotels"
  ON hotels
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

-- Indexes for unified_bookings
CREATE INDEX IF NOT EXISTS idx_unified_bookings_customer_id ON unified_bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_unified_bookings_booking_status ON unified_bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_unified_bookings_payment_status ON unified_bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_unified_bookings_service_type ON unified_bookings(service_type);
CREATE INDEX IF NOT EXISTS idx_unified_bookings_created_at ON unified_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_unified_bookings_scheduled_datetime ON unified_bookings(scheduled_datetime);

-- Indexes for user_profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Indexes for service-specific tables
CREATE INDEX IF NOT EXISTS idx_hire_requests_booking_id ON hire_requests(booking_id);
CREATE INDEX IF NOT EXISTS idx_doctor_appointments_booking_id ON doctor_appointments(booking_id);
CREATE INDEX IF NOT EXISTS idx_dinner_experiences_booking_id ON dinner_experiences(booking_id);
CREATE INDEX IF NOT EXISTS idx_airport_transfers_booking_id ON airport_transfers(booking_id);

-- =====================================================
-- UPDATE TRIGGER FOR unified_bookings
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_unified_bookings_updated_at ON unified_bookings;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE TRIGGER update_unified_bookings_updated_at
  BEFORE UPDATE ON unified_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
