export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hotels: {
        Row: {
          id: string
          name: string
          address: string
          contact_info: Json
          qr_code_id: string | null
          status: 'active' | 'inactive'
          prefecture: string | null
          city: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          contact_info?: Json
          qr_code_id?: string | null
          status?: 'active' | 'inactive'
          prefecture?: string | null
          city?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          contact_info?: Json
          qr_code_id?: string | null
          status?: 'active' | 'inactive'
          prefecture?: string | null
          city?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_number: string
          customer_name: string
          customer_phone: string
          customer_email: string | null
          pickup_hotel_id: string
          delivery_hotel_id: string
          pickup_date: string
          luggage_type: 'standard' | 'large'
          luggage_count: number
          special_notes: string | null
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          delivery_status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered'
          total_amount: number | null
          currency: string
          driver_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_number: string
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          pickup_hotel_id: string
          delivery_hotel_id: string
          pickup_date: string
          luggage_type?: 'standard' | 'large'
          luggage_count?: number
          special_notes?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          delivery_status?: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered'
          total_amount?: number | null
          currency?: string
          driver_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_number?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          pickup_hotel_id?: string
          delivery_hotel_id?: string
          pickup_date?: string
          luggage_type?: 'standard' | 'large'
          luggage_count?: number
          special_notes?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          delivery_status?: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered'
          total_amount?: number | null
          currency?: string
          driver_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          hotel_id: string
          code_data: string
          is_active: boolean
          scan_count: number
          created_at: string
          last_scanned_at: string | null
        }
        Insert: {
          id: string
          hotel_id: string
          code_data: string
          is_active?: boolean
          scan_count?: number
          created_at?: string
          last_scanned_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string
          code_data?: string
          is_active?: boolean
          scan_count?: number
          created_at?: string
          last_scanned_at?: string | null
        }
      }
      tracking_events: {
        Row: {
          id: string
          booking_id: string
          event_type: string
          event_description: string | null
          location_lat: number | null
          location_lng: number | null
          location_address: string | null
          photo_url: string | null
          driver_id: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          booking_id: string
          event_type: string
          event_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_address?: string | null
          photo_url?: string | null
          driver_id?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          booking_id?: string
          event_type?: string
          event_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_address?: string | null
          photo_url?: string | null
          driver_id?: string | null
          timestamp?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          role: 'customer' | 'hotel_staff' | 'driver' | 'admin'
          full_name: string | null
          phone: string | null
          hotel_id: string | null
          language_preference: 'ja' | 'en' | 'zh' | 'ko'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'customer' | 'hotel_staff' | 'driver' | 'admin'
          full_name?: string | null
          phone?: string | null
          hotel_id?: string | null
          language_preference?: 'ja' | 'en' | 'zh' | 'ko'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'customer' | 'hotel_staff' | 'driver' | 'admin'
          full_name?: string | null
          phone?: string | null
          hotel_id?: string | null
          language_preference?: 'ja' | 'en' | 'zh' | 'ko'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
