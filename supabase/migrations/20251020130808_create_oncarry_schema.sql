/*
  # OnCarry Travel Porter Database Schema

  1. New Tables
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text) - Hotel name
      - `address` (text) - Full address
      - `contact_info` (jsonb) - Contact details (phone, email, etc.)
      - `qr_code_id` (text, unique) - Associated QR code identifier
      - `status` (text) - active/inactive
      - `prefecture` (text) - Prefecture location
      - `city` (text) - City location
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `booking_number` (text, unique) - Human-readable booking reference
      - `customer_name` (text) - Customer full name
      - `customer_phone` (text) - Phone with country code
      - `customer_email` (text) - Email for notifications
      - `pickup_hotel_id` (uuid) - Reference to hotels
      - `delivery_hotel_id` (uuid) - Reference to hotels
      - `pickup_date` (date) - Scheduled pickup date
      - `luggage_type` (text) - standard/large
      - `luggage_count` (integer) - Number of pieces
      - `special_notes` (text) - Special handling instructions
      - `payment_status` (text) - pending/completed/failed/refunded
      - `delivery_status` (text) - pending/assigned/picked_up/in_transit/delivered
      - `total_amount` (numeric) - Payment amount
      - `currency` (text) - Currency code (JPY, USD, etc.)
      - `driver_id` (uuid) - Assigned driver reference
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `qr_codes`
      - `id` (text, primary key) - Unique QR identifier
      - `hotel_id` (uuid) - Reference to hotels
      - `code_data` (text) - Encrypted QR payload
      - `is_active` (boolean) - Active status
      - `scan_count` (integer) - Usage tracking
      - `created_at` (timestamptz)
      - `last_scanned_at` (timestamptz)

    - `tracking_events`
      - `id` (uuid, primary key)
      - `booking_id` (uuid) - Reference to bookings
      - `event_type` (text) - Type of event
      - `event_description` (text) - Detailed description
      - `location_lat` (numeric) - Latitude
      - `location_lng` (numeric) - Longitude
      - `location_address` (text) - Human-readable address
      - `photo_url` (text) - Photo confirmation URL
      - `driver_id` (uuid) - Driver who created event
      - `timestamp` (timestamptz)

    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `role` (text) - customer/hotel_staff/driver/admin
      - `full_name` (text)
      - `phone` (text)
      - `hotel_id` (uuid) - For hotel staff association
      - `language_preference` (text) - ja/en/zh/ko
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
    - Public access for QR code scanning and booking creation
    - Restrictive policies for sensitive operations
*/

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  contact_info jsonb DEFAULT '{}'::jsonb,
  qr_code_id text UNIQUE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  prefecture text,
  city text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  pickup_hotel_id uuid REFERENCES hotels(id) NOT NULL,
  delivery_hotel_id uuid REFERENCES hotels(id) NOT NULL,
  pickup_date date NOT NULL,
  luggage_type text DEFAULT 'standard' CHECK (luggage_type IN ('standard', 'large')),
  luggage_count integer DEFAULT 1 CHECK (luggage_count > 0),
  special_notes text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  delivery_status text DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'assigned', 'picked_up', 'in_transit', 'delivered')),
  total_amount numeric(10, 2),
  currency text DEFAULT 'JPY',
  driver_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create qr_codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id text PRIMARY KEY,
  hotel_id uuid REFERENCES hotels(id) NOT NULL,
  code_data text NOT NULL,
  is_active boolean DEFAULT true,
  scan_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_scanned_at timestamptz
);

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  event_type text NOT NULL,
  event_description text,
  location_lat numeric(10, 7),
  location_lng numeric(10, 7),
  location_address text,
  photo_url text,
  driver_id uuid,
  timestamp timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'customer' CHECK (role IN ('customer', 'hotel_staff', 'driver', 'admin')),
  full_name text,
  phone text,
  hotel_id uuid REFERENCES hotels(id),
  language_preference text DEFAULT 'en' CHECK (language_preference IN ('ja', 'en', 'zh', 'ko')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_hotel ON bookings(pickup_hotel_id);
CREATE INDEX IF NOT EXISTS idx_bookings_delivery_hotel ON bookings(delivery_hotel_id);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(delivery_status);
CREATE INDEX IF NOT EXISTS idx_tracking_events_booking ON tracking_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_timestamp ON tracking_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_qr_codes_hotel ON qr_codes(hotel_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_hotel ON user_profiles(hotel_id);

-- Enable Row Level Security
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hotels
CREATE POLICY "Hotels are viewable by everyone"
  ON hotels FOR SELECT
  USING (status = 'active');

CREATE POLICY "Hotels can be managed by admins"
  ON hotels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Bookings can be created by anyone"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Bookings viewable by customer, hotel staff, drivers, and admins"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND (
        user_profiles.role = 'admin'
        OR (user_profiles.role = 'hotel_staff' AND (user_profiles.hotel_id = bookings.pickup_hotel_id OR user_profiles.hotel_id = bookings.delivery_hotel_id))
        OR (user_profiles.role = 'driver' AND user_profiles.id = bookings.driver_id)
      )
    )
  );

CREATE POLICY "Bookings updatable by hotel staff, drivers, and admins"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND (
        user_profiles.role = 'admin'
        OR (user_profiles.role = 'hotel_staff' AND (user_profiles.hotel_id = bookings.pickup_hotel_id OR user_profiles.hotel_id = bookings.delivery_hotel_id))
        OR (user_profiles.role = 'driver' AND user_profiles.id = bookings.driver_id)
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND (
        user_profiles.role = 'admin'
        OR (user_profiles.role = 'hotel_staff' AND (user_profiles.hotel_id = bookings.pickup_hotel_id OR user_profiles.hotel_id = bookings.delivery_hotel_id))
        OR (user_profiles.role = 'driver' AND user_profiles.id = bookings.driver_id)
      )
    )
  );

-- RLS Policies for qr_codes
CREATE POLICY "QR codes viewable by everyone"
  ON qr_codes FOR SELECT
  USING (is_active = true);

CREATE POLICY "QR codes manageable by admins"
  ON qr_codes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for tracking_events
CREATE POLICY "Tracking events viewable by related parties"
  ON tracking_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = tracking_events.booking_id
    )
  );

CREATE POLICY "Tracking events created by drivers and admins"
  ON tracking_events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND (user_profiles.role = 'driver' OR user_profiles.role = 'admin')
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can create own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_hotels_updated_at
  BEFORE UPDATE ON hotels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS text AS $$
DECLARE
  new_number text;
  prefix text := 'OC';
  date_part text;
  random_part text;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYMMDD');
  random_part := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
  new_number := prefix || date_part || random_part;
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;