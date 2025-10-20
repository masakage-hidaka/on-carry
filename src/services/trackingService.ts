import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TrackingEvent = Database['public']['Tables']['tracking_events']['Row'];
type TrackingEventInsert = Database['public']['Tables']['tracking_events']['Insert'];

export interface LocationData {
  lat: number;
  lng: number;
  address?: string;
}

export const trackingService = {
  async addTrackingEvent(
    bookingId: string,
    eventType: string,
    description: string,
    location?: LocationData,
    photoUrl?: string,
    driverId?: string
  ): Promise<TrackingEvent> {
    const eventData: TrackingEventInsert = {
      booking_id: bookingId,
      event_type: eventType,
      event_description: description,
      location_lat: location?.lat,
      location_lng: location?.lng,
      location_address: location?.address,
      photo_url: photoUrl,
      driver_id: driverId
    };

    const { data, error } = await supabase
      .from('tracking_events')
      .insert(eventData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getTrackingEvents(bookingId: string): Promise<TrackingEvent[]> {
    const { data, error } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('booking_id', bookingId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getLatestLocation(bookingId: string): Promise<TrackingEvent | null> {
    const { data, error } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('booking_id', bookingId)
      .not('location_lat', 'is', null)
      .not('location_lng', 'is', null)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  subscribeToBookingUpdates(bookingId: string, callback: (event: TrackingEvent) => void) {
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tracking_events',
          filter: `booking_id=eq.${bookingId}`
        },
        (payload) => {
          callback(payload.new as TrackingEvent);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  async createBookingConfirmedEvent(bookingId: string): Promise<void> {
    await this.addTrackingEvent(
      bookingId,
      'booking_confirmed',
      'Booking confirmed and payment received'
    );
  },

  async createDriverAssignedEvent(bookingId: string, driverId: string): Promise<void> {
    await this.addTrackingEvent(
      bookingId,
      'driver_assigned',
      'Driver has been assigned to your booking',
      undefined,
      undefined,
      driverId
    );
  },

  async createPickupEvent(
    bookingId: string,
    location: LocationData,
    photoUrl: string,
    driverId: string
  ): Promise<void> {
    await this.addTrackingEvent(
      bookingId,
      'picked_up',
      'Luggage picked up from hotel',
      location,
      photoUrl,
      driverId
    );
  },

  async createInTransitEvent(
    bookingId: string,
    location: LocationData,
    driverId: string
  ): Promise<void> {
    await this.addTrackingEvent(
      bookingId,
      'in_transit',
      'Luggage is on the way to destination',
      location,
      undefined,
      driverId
    );
  },

  async createDeliveredEvent(
    bookingId: string,
    location: LocationData,
    photoUrl: string,
    driverId: string
  ): Promise<void> {
    await this.addTrackingEvent(
      bookingId,
      'delivered',
      'Luggage delivered successfully',
      location,
      photoUrl,
      driverId
    );
  }
};
