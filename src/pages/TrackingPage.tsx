import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Package, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { bookingService } from '../services/bookingService';
import { trackingService } from '../services/trackingService';
import type { Database } from '../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type TrackingEvent = Database['public']['Tables']['tracking_events']['Row'];

interface TrackingPageProps {
  bookingNumber?: string;
}

export function TrackingPage({ bookingNumber: initialBookingNumber }: TrackingPageProps) {
  const { t } = useLanguage();
  const [bookingNumber, setBookingNumber] = useState(initialBookingNumber || '');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialBookingNumber) {
      handleTrack();
    }
  }, [initialBookingNumber]);

  const handleTrack = async () => {
    if (!bookingNumber.trim()) return;

    setLoading(true);
    setError('');

    try {
      const bookingData = await bookingService.getBookingByNumber(bookingNumber);

      if (!bookingData) {
        setError('Booking not found');
        setBooking(null);
        setEvents([]);
        return;
      }

      setBooking(bookingData);

      const eventsData = await trackingService.getTrackingEvents(bookingData.id);
      setEvents(eventsData);

      const unsubscribe = trackingService.subscribeToBookingUpdates(
        bookingData.id,
        (newEvent) => {
          setEvents((prev) => [...prev, newEvent]);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error tracking booking:', err);
      setError('Failed to load tracking information');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'picked_up':
        return 'bg-orange-100 text-orange-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'assigned':
      case 'picked_up':
        return <Package className="w-5 h-5" />;
      case 'in_transit':
        return <MapPin className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.tracking.title}</h1>

          <div className="flex gap-4">
            <input
              type="text"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
              placeholder={t.tracking.enterBooking}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? t.common.loading : t.tracking.track}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {booking && (
          <>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.tracking.bookingNumber}: {booking.booking_number}
                </h2>
                <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${getStatusColor(booking.delivery_status)}`}>
                  {getStatusIcon(booking.delivery_status)}
                  {t.tracking.statuses[booking.delivery_status as keyof typeof t.tracking.statuses]}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">{t.booking.customerInfo}</h3>
                  <p className="text-gray-900">{booking.customer_name}</p>
                  <p className="text-gray-600">{booking.customer_phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">{t.booking.luggageInfo}</h3>
                  <p className="text-gray-900">
                    {booking.luggage_count}x {booking.luggage_type === 'standard' ? t.booking.standard : t.booking.large}
                  </p>
                  <p className="text-gray-600">{t.booking.pickupDate}: {new Date(booking.pickup_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.tracking.timeline}</h2>

              {events.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No tracking events yet</p>
              ) : (
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === events.length - 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {getStatusIcon(event.event_type)}
                        </div>
                        {index < events.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        )}
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{event.event_description}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>

                        {event.location_address && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location_address}
                          </p>
                        )}

                        {event.photo_url && (
                          <img
                            src={event.photo_url}
                            alt="Event photo"
                            className="mt-3 rounded-lg max-w-xs"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
