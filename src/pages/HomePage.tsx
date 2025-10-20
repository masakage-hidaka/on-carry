import { Package, Car } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {language === 'ja' ? 'TRAVEL PORTER' : 'OnCarry Travel Services'}
            </h1>
            <p className="text-lg sm:text-xl">
              {t.app.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-16 relative z-10">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === 'ja' ? 'サービス一覧' : 'Service List'}
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => onNavigate('book')}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  {language === 'ja' ? '荷物配送' : 'Luggage Delivery'}
                </span>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => onNavigate('hire')}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-200 transition-colors">
                  <Car className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  {language === 'ja' ? 'ハイヤー手配' : 'Hire Car Service'}
                </span>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              {language === 'ja'
                ? '荷物配送サービス・ハイヤー予約サービスをご利用いただくには、トラベルポーターへのご登録が必要です。'
                : 'Registration with Travel Porter is required to use luggage delivery and hire car services.'}
            </p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {language === 'ja' ? '荷物配送について' : 'About Luggage Delivery'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? 'ホテル間の荷物配送' : 'Hotel-to-hotel luggage delivery'}</li>
              <li>• {language === 'ja' ? '空港への配送対応' : 'Airport delivery available'}</li>
              <li>• {language === 'ja' ? 'リアルタイム追跡' : 'Real-time tracking'}</li>
              <li>• {language === 'ja' ? '当日・翌日配送可能' : 'Same-day and next-day delivery'}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {language === 'ja' ? 'ハイヤーサービスについて' : 'About Hire Car Service'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? 'プロドライバー付き' : 'Professional driver included'}</li>
              <li>• {language === 'ja' ? '時間貸し・配車のみ対応' : 'Hourly rental or pickup only'}</li>
              <li>• {language === 'ja' ? '複数車両タイプ' : 'Multiple vehicle types'}</li>
              <li>• {language === 'ja' ? '観光・空港送迎' : 'Tourism and airport transfers'}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            {language === 'ja' ? 'サービスエリア：大阪府・京都市' : 'Service Area: Osaka Prefecture & Kyoto City'}
          </p>
          <button
            onClick={() => onNavigate('track')}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            {language === 'ja' ? '予約を追跡する' : 'Track Your Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
