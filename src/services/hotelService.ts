import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Hotel = Database['public']['Tables']['hotels']['Row'];
type HotelInsert = Database['public']['Tables']['hotels']['Insert'];

export const hotelService = {
  async getActiveHotels(): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('status', 'active')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getHotelById(id: string): Promise<Hotel | null> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getHotelByQRCode(qrCodeId: string): Promise<Hotel | null> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('qr_code_id', qrCodeId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async searchHotels(query: string): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async createHotel(hotel: HotelInsert): Promise<Hotel> {
    const { data, error } = await supabase
      .from('hotels')
      .insert(hotel)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
