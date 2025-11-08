import { supabase } from './supabase';

export interface APIPartner {
  id: string;
  partner_name: string;
  service_type: 'doctor' | 'tourist_info' | 'tickets' | 'transportation' | 'general';
  api_endpoint: string;
  is_active: boolean;
  rate_limit: number;
  metadata: Record<string, unknown>;
}

export interface APIRequestLog {
  partner_id: string;
  service_type: string;
  request_id?: string;
  endpoint: string;
  request_data: Record<string, unknown>;
  response_data?: Record<string, unknown>;
  status_code?: number;
  success: boolean;
  error_message?: string;
}

class APIPartnerService {
  async getActivePartner(serviceType: string): Promise<APIPartner | null> {
    const { data, error } = await supabase
      .from('api_partners')
      .select('*')
      .eq('service_type', serviceType)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching API partner:', error);
      return null;
    }

    return data;
  }

  async logAPIRequest(log: APIRequestLog): Promise<void> {
    const { error } = await supabase
      .from('api_request_logs')
      .insert({
        partner_id: log.partner_id,
        service_type: log.service_type,
        request_id: log.request_id,
        endpoint: log.endpoint,
        request_data: log.request_data,
        response_data: log.response_data,
        status_code: log.status_code,
        success: log.success,
        error_message: log.error_message,
      });

    if (error) {
      console.error('Error logging API request:', error);
    }
  }

  async callPartnerAPI<T>(
    serviceType: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
    data?: Record<string, unknown>
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    const partner = await this.getActivePartner(serviceType);

    if (!partner) {
      return {
        success: false,
        error: 'No active API partner found for this service',
      };
    }

    const fullUrl = `${partner.api_endpoint}${endpoint}`;
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(fullUrl, options);
      const responseData = await response.json();

      await this.logAPIRequest({
        partner_id: partner.id,
        service_type: serviceType,
        request_id: requestId,
        endpoint: fullUrl,
        request_data: data || {},
        response_data: responseData,
        status_code: response.status,
        success: response.ok,
        error_message: response.ok ? undefined : responseData.message || 'API request failed',
      });

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || 'API request failed',
        };
      }

      return {
        success: true,
        data: responseData as T,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      await this.logAPIRequest({
        partner_id: partner.id,
        service_type: serviceType,
        request_id: requestId,
        endpoint: fullUrl,
        request_data: data || {},
        success: false,
        error_message: errorMessage,
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export const apiPartnerService = new APIPartnerService();

export interface DoctorConsultation {
  id?: string;
  user_id: string;
  consultation_date: string;
  consultation_type: 'video' | 'chat' | 'phone';
  symptoms: string;
  language: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  external_provider_id?: string;
  external_consultation_id?: string;
  video_call_url?: string;
  prescription?: string;
  notes?: string;
  price: number;
}

export interface TouristInfoRequest {
  id?: string;
  user_id: string;
  request_type: 'attractions' | 'restaurants' | 'events' | 'custom';
  location: string;
  interests: string[];
  language: string;
  status: 'pending' | 'processing' | 'completed';
  response_data?: Record<string, unknown>;
  external_api_source?: string;
}

export interface TicketBooking {
  id?: string;
  user_id: string;
  ticket_type: 'attraction' | 'transportation' | 'event' | 'tour';
  ticket_name: string;
  venue_name: string;
  booking_date?: string;
  visit_date: string;
  quantity: number;
  price_per_ticket: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'used' | 'cancelled' | 'refunded';
  external_provider_id?: string;
  external_booking_id?: string;
  qr_code?: string;
  booking_details?: Record<string, unknown>;
}

export const doctorService = {
  async createConsultation(consultation: DoctorConsultation) {
    const result = await apiPartnerService.callPartnerAPI(
      'doctor',
      '/consultations',
      'POST',
      consultation
    );

    if (result.success && result.data) {
      const { data, error } = await supabase
        .from('doctor_consultations')
        .insert({
          ...consultation,
          external_consultation_id: (result.data as any).consultation_id,
          video_call_url: (result.data as any).video_url,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    throw new Error(result.error || 'Failed to create consultation');
  },

  async getConsultations(userId: string) {
    const { data, error } = await supabase
      .from('doctor_consultations')
      .select('*')
      .eq('user_id', userId)
      .order('consultation_date', { ascending: false });

    if (error) throw error;
    return data;
  },
};

export const touristInfoService = {
  async createRequest(request: TouristInfoRequest) {
    const result = await apiPartnerService.callPartnerAPI(
      'tourist_info',
      '/search',
      'POST',
      request
    );

    const { data, error } = await supabase
      .from('tourist_info_requests')
      .insert({
        ...request,
        response_data: result.data || {},
        status: result.success ? 'completed' : 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getRequests(userId: string) {
    const { data, error } = await supabase
      .from('tourist_info_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};

export const ticketService = {
  async createBooking(booking: TicketBooking) {
    const result = await apiPartnerService.callPartnerAPI(
      'tickets',
      '/bookings',
      'POST',
      booking
    );

    if (result.success && result.data) {
      const { data, error } = await supabase
        .from('ticket_bookings')
        .insert({
          ...booking,
          external_booking_id: (result.data as any).booking_id,
          qr_code: (result.data as any).qr_code,
          status: 'confirmed',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    throw new Error(result.error || 'Failed to create booking');
  },

  async getBookings(userId: string) {
    const { data, error } = await supabase
      .from('ticket_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('visit_date', { ascending: false });

    if (error) throw error;
    return data;
  },
};
