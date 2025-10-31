/*
  # Production Enhancements - Reviews, Notifications, and Guides
  
  ## New Tables
  
  1. **payments** - Payment tracking and management
  2. **reviews** - Customer reviews and ratings
  3. **notifications** - User notifications (email/SMS/push)
  4. **guides** - Guide profiles for Dinner Companion service (extends companions table)
  5. **guide_availability** - Schedule management for guides
  
  ## Security
  - RLS enabled on all new tables
  - Policies for authenticated users and admins
*/

-- ========================================
-- 1. PAYMENTS (決済情報)
-- ========================================

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES unified_bookings(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'JPY',
  payment_method text CHECK (payment_method IN ('card', 'cash', 'paypay', 'stripe', 'other')),
  payment_provider text CHECK (payment_provider IN ('stripe', 'square', 'paypay', 'cash', 'other')),
  transaction_id text,
  stripe_payment_intent_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'partial_refund')),
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount decimal(10,2),
  refund_reason text,
  receipt_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- ========================================
-- 2. REVIEWS (レビュー)
-- ========================================

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES unified_bookings(id) ON DELETE CASCADE UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_quality integer CHECK (service_quality >= 1 AND service_quality <= 5),
  value_for_money integer CHECK (value_for_money >= 1 AND value_for_money <= 5),
  guide_rating integer CHECK (guide_rating >= 1 AND guide_rating <= 5),
  comment text,
  photos text[],
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT true,
  admin_response text,
  admin_responded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON reviews(is_published);

-- ========================================
-- 3. NOTIFICATIONS (通知)
-- ========================================

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES unified_bookings(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('booking_confirmed', 'status_update', 'reminder', 'review_request', 'payment_received', 'cancellation', 'other')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  read_at timestamptz,
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  sms_sent boolean DEFAULT false,
  sms_sent_at timestamptz,
  push_sent boolean DEFAULT false,
  push_sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ========================================
-- 4. GUIDES (ガイド情報強化)
-- ========================================

CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id uuid REFERENCES companions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  languages text[] DEFAULT ARRAY['ja', 'en'],
  specialties text[] DEFAULT ARRAY[]::text[],
  bio text,
  profile_image text,
  university text,
  student_id text,
  rating decimal(3,2) DEFAULT 0,
  total_tours integer DEFAULT 0,
  total_reviews integer DEFAULT 0,
  availability_status text DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'offline', 'on_leave')),
  max_guests_per_tour integer DEFAULT 6,
  hourly_rate decimal(10,2),
  is_verified boolean DEFAULT false,
  verified_at timestamptz,
  joined_at timestamptz DEFAULT now(),
  last_active_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_guides_companion_id ON guides(companion_id);
CREATE INDEX IF NOT EXISTS idx_guides_user_id ON guides(user_id);
CREATE INDEX IF NOT EXISTS idx_guides_availability_status ON guides(availability_status);
CREATE INDEX IF NOT EXISTS idx_guides_rating ON guides(rating DESC);

-- ========================================
-- 5. GUIDE_AVAILABILITY (ガイドスケジュール)
-- ========================================

CREATE TABLE IF NOT EXISTS guide_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id uuid REFERENCES guides(id) ON DELETE CASCADE,
  date date NOT NULL,
  time_slot text NOT NULL CHECK (time_slot IN ('lunch', 'afternoon', 'evening', 'night')),
  is_available boolean DEFAULT true,
  booking_id uuid REFERENCES unified_bookings(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(guide_id, date, time_slot)
);

CREATE INDEX IF NOT EXISTS idx_guide_availability_guide_id ON guide_availability(guide_id);
CREATE INDEX IF NOT EXISTS idx_guide_availability_date ON guide_availability(date);

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_payments_updated_at') THEN
    CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reviews_updated_at') THEN
    CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_guides_updated_at') THEN
    CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END$$;

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all new tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_availability ENABLE ROW LEVEL SECURITY;

-- PAYMENTS POLICIES
CREATE POLICY "Users can view own payments" ON payments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM unified_bookings WHERE unified_bookings.id = payments.booking_id AND unified_bookings.customer_id = auth.uid())
);

CREATE POLICY "Admins can view all payments" ON payments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

CREATE POLICY "Admins can update payments" ON payments FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

-- REVIEWS POLICIES
CREATE POLICY "Anyone can view published reviews" ON reviews FOR SELECT USING (is_published = true);

CREATE POLICY "Users can create reviews for own bookings" ON reviews FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM unified_bookings WHERE unified_bookings.id = booking_id AND unified_bookings.customer_id = auth.uid())
);

CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reviews" ON reviews FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

CREATE POLICY "Admins can update all reviews" ON reviews FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- GUIDES POLICIES
CREATE POLICY "Anyone can view verified active guides" ON guides FOR SELECT USING (
  is_verified = true AND availability_status != 'offline'
);

CREATE POLICY "Guides can update own profile" ON guides FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all guides" ON guides FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

CREATE POLICY "Admins can update all guides" ON guides FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

-- GUIDE_AVAILABILITY POLICIES
CREATE POLICY "Anyone can view available time slots" ON guide_availability FOR SELECT USING (is_available = true);

CREATE POLICY "Guides can manage own availability" ON guide_availability FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM guides WHERE guides.id = guide_availability.guide_id AND guides.user_id = auth.uid())
);

CREATE POLICY "Admins can manage all availability" ON guide_availability FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin')
);

-- ========================================
-- UTILITY FUNCTIONS
-- ========================================

-- Update guide rating when new review is added
CREATE OR REPLACE FUNCTION update_guide_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE guides
  SET 
    rating = (
      SELECT AVG(r.guide_rating)
      FROM reviews r
      JOIN dinner_experiences de ON r.booking_id = de.booking_id
      JOIN guides g ON de.companion_id = g.companion_id
      WHERE g.id = (
        SELECT id FROM guides WHERE companion_id = (
          SELECT companion_id FROM dinner_experiences WHERE booking_id = NEW.booking_id
        )
      )
      AND r.guide_rating IS NOT NULL
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews r
      JOIN dinner_experiences de ON r.booking_id = de.booking_id
      WHERE de.companion_id = (
        SELECT companion_id FROM dinner_experiences WHERE booking_id = NEW.booking_id
      )
    )
  WHERE companion_id = (
    SELECT companion_id FROM dinner_experiences WHERE booking_id = NEW.booking_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_guide_rating_trigger') THEN
    CREATE TRIGGER update_guide_rating_trigger
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_guide_rating();
  END IF;
END$$;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_booking_id uuid,
  p_type text,
  p_title text,
  p_message text
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, booking_id, type, title, message)
  VALUES (p_user_id, p_booking_id, p_type, p_title, p_message)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
