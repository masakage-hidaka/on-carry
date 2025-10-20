import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type QRCode = Database['public']['Tables']['qr_codes']['Row'];

export const qrService = {
  async generateQRCode(hotelId: string): Promise<string> {
    const qrId = `QR-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const codeData = JSON.stringify({
      hotelId,
      qrId,
      timestamp: Date.now(),
      version: '1.0'
    });

    const { error } = await supabase
      .from('qr_codes')
      .insert({
        id: qrId,
        hotel_id: hotelId,
        code_data: codeData,
        is_active: true
      });

    if (error) throw error;

    await supabase
      .from('hotels')
      .update({ qr_code_id: qrId })
      .eq('id', hotelId);

    return qrId;
  },

  async scanQRCode(qrId: string): Promise<QRCode | null> {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('id', qrId)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      await supabase
        .from('qr_codes')
        .update({
          scan_count: data.scan_count + 1,
          last_scanned_at: new Date().toISOString()
        })
        .eq('id', qrId);
    }

    return data;
  },

  async getQRCodeByHotel(hotelId: string): Promise<QRCode | null> {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  parseQRData(codeData: string): { hotelId: string; qrId: string } {
    try {
      const parsed = JSON.parse(codeData);
      return {
        hotelId: parsed.hotelId,
        qrId: parsed.qrId
      };
    } catch (error) {
      throw new Error('Invalid QR code data');
    }
  }
};
