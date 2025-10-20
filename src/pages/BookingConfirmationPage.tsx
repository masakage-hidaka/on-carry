import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingConfirmationPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  bookingNumber?: string;
}

export function BookingConfirmationPage({ onNavigate, bookingNumber }: BookingConfirmationPageProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ja' ? '予約完了' : 'Booking Confirmed'}
          </h1>

          {bookingNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">
                {language === 'ja' ? '予約番号' : 'Booking Number'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{bookingNumber}</p>
            </div>
          )}

          <p className="text-gray-600 mb-8">
            {language === 'ja'
              ? 'ご予約ありがとうございます。確認メールをお送りしました。'
              : 'Thank you for your booking. A confirmation email has been sent.'}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onNavigate('track', { bookingNumber: bookingNumber || '' })}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'ja' ? '予約を追跡する' : 'Track Your Booking'}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {language === 'ja' ? 'ホームに戻る' : 'Return to Home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
