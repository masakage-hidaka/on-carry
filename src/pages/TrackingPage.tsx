import { MapPin, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TrackingPageProps {
  bookingNumber?: string;
}

export function TrackingPage({ bookingNumber }: TrackingPageProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ja' ? '予約追跡' : 'Track Your Booking'}
            </h1>
          </div>

          {bookingNumber ? (
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'ja' ? '予約番号' : 'Booking Number'}
                </p>
                <p className="text-xl font-bold text-gray-900">{bookingNumber}</p>
              </div>

              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === 'ja'
                    ? 'リアルタイム追跡は準備中です'
                    : 'Real-time tracking coming soon'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                {language === 'ja'
                  ? '予約番号を入力して追跡を開始'
                  : 'Enter your booking number to track'}
              </p>
              <input
                type="text"
                placeholder={language === 'ja' ? '予約番号を入力' : 'Enter booking number'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {language === 'ja' ? '追跡' : 'Track'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
