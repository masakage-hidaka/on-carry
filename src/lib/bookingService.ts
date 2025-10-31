import { supabase } from './supabase';

export interface CreateBookingParams {
  serviceType: 'porter' | 'hire' | 'airport' | 'doctor' | 'dinner';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingData: any;
  totalAmount: number;
  scheduledDatetime?: string;
  specialRequests?: string;
  customerId?: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  service_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  booking_status: string;
  payment_status: string;
  created_at: string;
}

export const bookingService = {
  async createBooking(params: CreateBookingParams): Promise<Booking> {
    try {
      const bookingNumber = this.generateBookingNumber(params.serviceType);

      const { data: booking, error } = await supabase
        .from('unified_bookings')
        .insert({
          booking_number: bookingNumber,
          service_type: params.serviceType,
          customer_id: params.customerId || null,
          customer_name: params.customerName,
          customer_email: params.customerEmail,
          customer_phone: params.customerPhone,
          booking_data: params.bookingData,
          total_amount: params.totalAmount,
          scheduled_datetime: params.scheduledDatetime,
          special_requests: params.specialRequests,
          booking_status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      await this.createServiceSpecificBooking(booking.id, params.serviceType, params.bookingData);
      await this.sendConfirmationEmail(booking);

      return booking;
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw new Error('予約の作成に失敗しました。もう一度お試しください。');
    }
  },

  async createServiceSpecificBooking(bookingId: string, serviceType: string, data: any) {
    try {
      switch (serviceType) {
        case 'dinner':
          await supabase.from('dinner_experiences').insert({
            booking_id: bookingId,
            experience_type: data.tourType,
            group_size: data.numGuests,
            dietary_restrictions: data.dietaryRestrictions ? [data.dietaryRestrictions] : null,
            scheduled_datetime: data.scheduledDatetime,
            pickup_location: data.meetingPoint || 'Travel Hub Namba',
            budget_range: data.budgetRange || 'mid_range',
          });
          break;

        case 'hire':
          await supabase.from('hire_requests').insert({
            booking_id: bookingId,
            pickup_location: data.pickupLocation,
            pickup_datetime: data.pickupDatetime,
            destination: data.destination,
            vehicle_type: data.vehicleType,
            passenger_count: data.passengerCount,
            rental_type: data.rentalType,
          });
          break;

        case 'airport':
          await supabase.from('airport_transfers').insert({
            booking_id: bookingId,
            transfer_type: data.transferType,
            pickup_location: data.pickupLocation,
            pickup_datetime: data.pickupDatetime,
            flight_number: data.flightNumber,
            passenger_count: data.passengerCount,
            luggage_count: data.luggageCount,
          });
          break;

        case 'doctor':
          await supabase.from('doctor_appointments').insert({
            booking_id: bookingId,
            consultation_type: data.consultationType,
            symptoms: data.symptoms,
            appointment_datetime: data.appointmentDatetime,
            preferred_language: data.preferredLanguage || 'en',
            urgency_level: data.urgencyLevel || 3,
          });
          break;

        case 'porter':
          break;
      }
    } catch (error) {
      console.error('Service-specific booking creation failed:', error);
    }
  },

  async sendConfirmationEmail(booking: Booking) {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const emailHtml = this.generateConfirmationEmailHtml(booking);

      await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          to: booking.customer_email,
          subject: `予約確認 - ${booking.booking_number} | OnCarry`,
          html: emailHtml,
        }),
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  },

  generateConfirmationEmailHtml(booking: Booking): string {
    const serviceNames: Record<string, { ja: string; en: string }> = {
      porter: { ja: 'Travel Porter（荷物預かり）', en: 'Travel Porter' },
      hire: { ja: 'Travel Hire（ハイヤーサービス）', en: 'Travel Hire' },
      airport: { ja: 'Transportation（空港送迎）', en: 'Airport Transportation' },
      doctor: { ja: 'Travel Doctor（医療相談）', en: 'Travel Doctor' },
      dinner: { ja: 'Dinner Companion（Osaka Buddies）', en: 'Dinner Companion' },
    };

    const serviceName = serviceNames[booking.service_type]?.ja || booking.service_type;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>予約確認 - OnCarry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">OnCarry</h1>
              <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 18px;">ご予約ありがとうございます</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background: white; padding: 40px 30px;">
              <h2 style="color: #111827; margin: 0 0 24px 0; font-size: 24px;">予約詳細</h2>

              <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 40%;">予約番号</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; font-size: 18px; color: #f97316;">${booking.booking_number}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">サービス</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">お名前</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${booking.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">合計金額</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; font-size: 20px; color: #f97316;">¥${booking.total_amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">予約日時</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${new Date(booking.created_at).toLocaleString('ja-JP')}</td>
                </tr>
              </table>

              <!-- Important Notice -->
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>重要:</strong> 予約番号は当日必要になります。このメールを保存またはスクリーンショットしてください。
                </p>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="https://on-carry.com/tracking?booking=${booking.booking_number}"
                       style="display: inline-block; background: #f97316; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      予約を追跡
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <h3 style="color: #111827; margin: 0 0 16px 0; font-size: 18px;">次のステップ</h3>
                <ol style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>予約確認メール（このメール）を保存</li>
                  <li>サービス開始24時間前にリマインダーメールが届きます</li>
                  <li>当日は予約番号をご提示ください</li>
                </ol>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px 0;">
                ご不明な点がございましたら、お気軽にお問い合わせください
              </p>
              <p style="margin: 0;">
                <a href="mailto:support@on-carry.com" style="color: #f97316; text-decoration: none; font-weight: 500;">support@on-carry.com</a>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                © 2025 OnCarry. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  generateBookingNumber(serviceType: string): string {
    const prefix = serviceType.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  },

  async getBooking(bookingNumber: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('unified_bookings')
        .select('*')
        .eq('booking_number', bookingNumber)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      return null;
    }
  },

  async updateBookingStatus(bookingId: string, status: string) {
    try {
      const { error } = await supabase
        .from('unified_bookings')
        .update({
          booking_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update booking status:', error);
      throw error;
    }
  },

  async updatePaymentStatus(bookingId: string, status: string, paymentIntentId?: string) {
    try {
      const { error } = await supabase
        .from('unified_bookings')
        .update({
          payment_status: status,
          stripe_payment_intent_id: paymentIntentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      if (status === 'completed' && paymentIntentId) {
        await supabase.from('payments').insert({
          booking_id: bookingId,
          amount: 0,
          payment_provider: 'stripe',
          stripe_payment_intent_id: paymentIntentId,
          status: 'completed',
          paid_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to update payment status:', error);
      throw error;
    }
  },
};
