/*
  # Additional Services - Travel Doctor, Tourist Info, Ticket Booking

  1. New Tables
    - `doctor_consultations` - オンライン医療相談の予約
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - consultation_date (timestamptz)
      - consultation_type (text: 'video', 'chat', 'phone')
      - symptoms (text)
      - language (text)
      - status (text: 'pending', 'confirmed', 'completed', 'cancelled')
      - external_provider_id (text) - 外部医療サービスプロバイダーのID
      - external_consultation_id (text) - 外部システムの予約ID
      - video_call_url (text)
      - prescription (text)
      - notes (text)
      - price (integer)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `tourist_info_requests` - 観光案内リクエスト
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - request_type (text: 'attractions', 'restaurants', 'events', 'custom')
      - location (text)
      - interests (text[])
      - language (text)
      - status (text: 'pending', 'processing', 'completed')
      - response_data (jsonb) - 観光情報の結果
      - external_api_source (text) - 使用した外部API
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `ticket_bookings` - チケット予約
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - ticket_type (text: 'attraction', 'transportation', 'event', 'tour')
      - ticket_name (text)
      - venue_name (text)
      - booking_date (timestamptz)
      - visit_date (date)
      - quantity (integer)
      - price_per_ticket (integer)
      - total_price (integer)
      - status (text: 'pending', 'confirmed', 'used', 'cancelled', 'refunded')
      - external_provider_id (text) - チケット販売プロバイダーのID
      - external_booking_id (text) - 外部システムの予約ID
      - qr_code (text) - QRコードデータ
      - booking_details (jsonb) - 詳細情報
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `api_partners` - 外部APIパートナー管理
      - id (uuid, primary key)
      - partner_name (text)
      - service_type (text: 'doctor', 'tourist_info', 'tickets')
      - api_endpoint (text)
      - api_key_encrypted (text)
      - is_active (boolean)
      - rate_limit (integer)
      - metadata (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `api_request_logs` - API連携ログ
      - id (uuid, primary key)
      - partner_id (uuid, references api_partners)
      - service_type (text)
      - request_id (text)
      - endpoint (text)
      - request_data (jsonb)
      - response_data (jsonb)
      - status_code (integer)
      - success (boolean)
      - error_message (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can view/manage their own bookings
    - Admin can view/manage all bookings
    - API partners table is admin-only
    - API logs are admin-only
*/

-- Doctor Consultations Table
CREATE TABLE IF NOT EXISTS doctor_consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  consultation_date timestamptz NOT NULL,
  consultation_type text NOT NULL CHECK (consultation_type IN ('video', 'chat', 'phone')),
  symptoms text NOT NULL,
  language text NOT NULL DEFAULT 'ja',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  external_provider_id text,
  external_consultation_id text,
  video_call_url text,
  prescription text,
  notes text,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tourist Info Requests Table
CREATE TABLE IF NOT EXISTS tourist_info_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  request_type text NOT NULL CHECK (request_type IN ('attractions', 'restaurants', 'events', 'custom')),
  location text NOT NULL,
  interests text[] DEFAULT '{}',
  language text NOT NULL DEFAULT 'ja',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  response_data jsonb DEFAULT '{}',
  external_api_source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ticket Bookings Table
CREATE TABLE IF NOT EXISTS ticket_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticket_type text NOT NULL CHECK (ticket_type IN ('attraction', 'transportation', 'event', 'tour')),
  ticket_name text NOT NULL,
  venue_name text NOT NULL,
  booking_date timestamptz DEFAULT now(),
  visit_date date NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_per_ticket integer NOT NULL CHECK (price_per_ticket >= 0),
  total_price integer NOT NULL CHECK (total_price >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'used', 'cancelled', 'refunded')),
  external_provider_id text,
  external_booking_id text,
  qr_code text,
  booking_details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API Partners Table
CREATE TABLE IF NOT EXISTS api_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('doctor', 'tourist_info', 'tickets', 'transportation', 'general')),
  api_endpoint text NOT NULL,
  api_key_encrypted text,
  is_active boolean DEFAULT true,
  rate_limit integer DEFAULT 1000,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API Request Logs Table
CREATE TABLE IF NOT EXISTS api_request_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid REFERENCES api_partners(id) ON DELETE SET NULL,
  service_type text NOT NULL,
  request_id text,
  endpoint text NOT NULL,
  request_data jsonb DEFAULT '{}',
  response_data jsonb DEFAULT '{}',
  status_code integer,
  success boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE doctor_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourist_info_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_request_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for doctor_consultations
CREATE POLICY "Users can view own doctor consultations"
  ON doctor_consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own doctor consultations"
  ON doctor_consultations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own doctor consultations"
  ON doctor_consultations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all doctor consultations"
  ON doctor_consultations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all doctor consultations"
  ON doctor_consultations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS Policies for tourist_info_requests
CREATE POLICY "Users can view own tourist info requests"
  ON tourist_info_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tourist info requests"
  ON tourist_info_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tourist info requests"
  ON tourist_info_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS Policies for ticket_bookings
CREATE POLICY "Users can view own ticket bookings"
  ON ticket_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own ticket bookings"
  ON ticket_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ticket bookings"
  ON ticket_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all ticket bookings"
  ON ticket_bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all ticket bookings"
  ON ticket_bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS Policies for api_partners (Admin only)
CREATE POLICY "Admins can view all API partners"
  ON api_partners FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage API partners"
  ON api_partners FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS Policies for api_request_logs (Admin only)
CREATE POLICY "Admins can view all API logs"
  ON api_request_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_doctor_consultations_user_id ON doctor_consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_consultations_status ON doctor_consultations(status);
CREATE INDEX IF NOT EXISTS idx_doctor_consultations_date ON doctor_consultations(consultation_date);

CREATE INDEX IF NOT EXISTS idx_tourist_info_requests_user_id ON tourist_info_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_tourist_info_requests_status ON tourist_info_requests(status);

CREATE INDEX IF NOT EXISTS idx_ticket_bookings_user_id ON ticket_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_ticket_bookings_status ON ticket_bookings(status);
CREATE INDEX IF NOT EXISTS idx_ticket_bookings_visit_date ON ticket_bookings(visit_date);

CREATE INDEX IF NOT EXISTS idx_api_request_logs_partner_id ON api_request_logs(partner_id);
CREATE INDEX IF NOT EXISTS idx_api_request_logs_created_at ON api_request_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_api_request_logs_success ON api_request_logs(success);

-- Update timestamp trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers
DROP TRIGGER IF EXISTS update_doctor_consultations_updated_at ON doctor_consultations;
CREATE TRIGGER update_doctor_consultations_updated_at
  BEFORE UPDATE ON doctor_consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tourist_info_requests_updated_at ON tourist_info_requests;
CREATE TRIGGER update_tourist_info_requests_updated_at
  BEFORE UPDATE ON tourist_info_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ticket_bookings_updated_at ON ticket_bookings;
CREATE TRIGGER update_ticket_bookings_updated_at
  BEFORE UPDATE ON ticket_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_api_partners_updated_at ON api_partners;
CREATE TRIGGER update_api_partners_updated_at
  BEFORE UPDATE ON api_partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
