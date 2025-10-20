import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupHotelId: string;
  deliveryHotelId: string;
  pickupDate: string;
  luggageType: 'standard' | 'large';
  luggageCount: number;
  specialNotes?: string;
}

export const bookingService = {
  async createBooking(formData: BookingFormData): Promise<Booking> {
    const bookingNumber = await this.generateBookingNumber();

    const totalAmount = this.calculateAmount(formData.luggageType, formData.luggageCount);

    const bookingData: BookingInsert = {
      booking_number: bookingNumber,
      customer_name: formData.customerName,
      customer_phone: formData.customerPhone,
      customer_email: formData.customerEmail,
      pickup_hotel_id: formData.pickupHotelId,
      delivery_hotel_id: formData.deliveryHotelId,
      pickup_date: formData.pickupDate,
      luggage_type: formData.luggageType,
      luggage_count: formData.luggageCount,
      special_notes: formData.specialNotes,
      total_amount: totalAmount,
      currency: 'JPY',
      payment_status: 'pending',
      delivery_status: 'pending'
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select(`
        *,
        pickup_hotel:hotels!bookings_pickup_hotel_id_fkey(id, name, address),
        delivery_hotel:hotels!bookings_delivery_hotel_id_fkey(id, name, address)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        pickup_hotel:hotels!bookings_pickup_hotel_id_fkey(*),
        delivery_hotel:hotels!bookings_delivery_hotel_id_fkey(*)
      `)
      .eq('booking_number', bookingNumber)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        pickup_hotel:hotels!bookings_pickup_hotel_id_fkey(*),
        delivery_hotel:hotels!bookings_delivery_hotel_id_fkey(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateBookingStatus(id: string, updates: BookingUpdate): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getBookingsByHotel(hotelId: string, dateFilter?: string): Promise<Booking[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        pickup_hotel:hotels!bookings_pickup_hotel_id_fkey(id, name, address),
        delivery_hotel:hotels!bookings_delivery_hotel_id_fkey(id, name, address)
      `)
      .or(`pickup_hotel_id.eq.${hotelId},delivery_hotel_id.eq.${hotelId}`)
      .order('pickup_date', { ascending: false });

    if (dateFilter) {
      query = query.eq('pickup_date', dateFilter);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async updatePaymentStatus(bookingId: string, status: 'pending' | 'completed' | 'failed' | 'refunded'): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: status })
      .eq('id', bookingId);

    if (error) throw error;
  },

  async generateBookingNumber(): Promise<string> {
    const { data, error } = await supabase.rpc('generate_booking_number');

    if (error) throw error;
    return data as string;
  },

  calculateAmount(luggageType: 'standard' | 'large', count: number): number {
    const basePrice = luggageType === 'standard' ? 1000 : 1500;
    return basePrice * count;
  },

  validateBookingDate(date: string): boolean {
    const pickupDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    return pickupDate >= today && pickupDate <= maxDate;
  }
};
