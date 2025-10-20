import { CheckCircle, MapPin, Calendar, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingConfirmationPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  bookingNumber: string;
}

export function BookingConfirmationPage({ onNavigate, bookingNumber }: BookingConfirmationPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.booking.success}</h1>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">{t.booking.bookingNumber}</p>
            <p className="text-3xl font-bold text-blue-600">{bookingNumber}</p>
          </div>

          <div className="text-left space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">What's Next?</p>
                <p className="text-gray-600">
                  A driver will be assigned to your booking soon. You'll receive updates via email and can track your luggage anytime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Real-Time Tracking</p>
                <p className="text-gray-600">
                  Use your booking number to track your luggage from pickup to delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Pickup Schedule</p>
                <p className="text-gray-600">
                  Please have your luggage ready at the hotel reception on your scheduled pickup date.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('track', { bookingNumber })}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t.tracking.track}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              {t.nav.home}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
