import { Package, Car, Stethoscope, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, language } = useLanguage();

  const services = [
    {
      id: 'transportation',
      icon: Package,
      titleJa: '交通・荷物サービス',
      titleEn: 'Transportation & Luggage',
      descJa: '荷物配送・空港送迎',
      descEn: 'Luggage delivery & airport transfers',
      bgColor: 'bg-blue-100',
      hoverBg: 'group-hover:bg-blue-200',
      textColor: 'text-blue-600',
      hoverBorder: 'hover:border-blue-500',
      route: 'transportation'
    },
    {
      id: 'hire',
      icon: Car,
      titleJa: 'ハイヤー手配',
      titleEn: 'Travel Hire',
      descJa: 'プロドライバー付き車両',
      descEn: 'Premium car service with driver',
      bgColor: 'bg-green-100',
      hoverBg: 'group-hover:bg-green-200',
      textColor: 'text-green-600',
      hoverBorder: 'hover:border-green-500',
      route: 'hire'
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      titleJa: 'トラベルドクター',
      titleEn: 'Travel Doctor',
      descJa: 'オンライン医療相談',
      descEn: 'Online medical consultation',
      bgColor: 'bg-red-100',
      hoverBg: 'group-hover:bg-red-200',
      textColor: 'text-red-600',
      hoverBorder: 'hover:border-red-500',
      route: 'doctor'
    },
    {
      id: 'dinner',
      icon: UtensilsCrossed,
      titleJa: 'ディナーコンパニオン',
      titleEn: 'Dinner Companion',
      descJa: '地元ガイドと食事体験',
      descEn: 'Local dining experiences',
      bgColor: 'bg-orange-100',
      hoverBg: 'group-hover:bg-orange-200',
      textColor: 'text-orange-600',
      hoverBorder: 'hover:border-orange-500',
      route: 'dinner'
    }
  ];

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
              OnCarry
            </h1>
            <p className="text-lg sm:text-xl">
              {t.app.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-16 relative z-10">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === 'ja' ? 'サービス一覧' : 'Service List'}
          </h2>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => onNavigate(service.route)}
                  className={`w-full bg-white border-2 border-gray-200 rounded-xl p-6 ${service.hoverBorder} hover:shadow-md transition-all group flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${service.bgColor} p-4 rounded-full ${service.hoverBg} transition-colors`}>
                      <Icon className={`w-8 h-8 ${service.textColor}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-semibold text-gray-900">
                        {language === 'ja' ? service.titleJa : service.titleEn}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {language === 'ja' ? service.descJa : service.descEn}
                      </div>
                    </div>
                  </div>
                  <svg className={`w-6 h-6 text-gray-400 group-hover:${service.textColor} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              {language === 'ja'
                ? 'すべてのサービスをご利用いただくには、OnCarryへのご登録が必要です。'
                : 'Registration with OnCarry is required to use all services.'}
            </p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ja' ? '交通・荷物サービス' : 'Transportation & Luggage'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? 'ホテル間の荷物配送' : 'Hotel-to-hotel luggage delivery'}</li>
              <li>• {language === 'ja' ? '関西国際空港送迎' : 'Kansai Airport transfers'}</li>
              <li>• {language === 'ja' ? '組み合わせ予約で15%割引' : '15% discount on combined bookings'}</li>
              <li>• {language === 'ja' ? 'リアルタイム追跡' : 'Real-time tracking'}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Car className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ja' ? 'ハイヤーサービス' : 'Travel Hire Service'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? 'プロドライバー付き' : 'Professional driver included'}</li>
              <li>• {language === 'ja' ? '時間貸し・終日対応' : 'Hourly or full-day rental'}</li>
              <li>• {language === 'ja' ? '複数車両タイプ' : 'Multiple vehicle types'}</li>
              <li>• {language === 'ja' ? 'API連携パートナー' : 'API-integrated partners'}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Stethoscope className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ja' ? 'トラベルドクター' : 'Travel Doctor'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? 'オンライン医療相談' : 'Online medical consultation'}</li>
              <li>• {language === 'ja' ? '多言語対応' : 'Multi-language support'}</li>
              <li>• {language === 'ja' ? '緊急相談可能' : 'Emergency consultation available'}</li>
              <li>• {language === 'ja' ? 'ビデオ通話対応' : 'Video consultation ready'}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ja' ? 'ディナーコンパニオン' : 'Dinner Companion'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {language === 'ja' ? '地元ガイド同行' : 'Local guide accompaniment'}</li>
              <li>• {language === 'ja' ? '直前予約対応（1時間前まで）' : 'Last-minute booking (up to 1hr before)'}</li>
              <li>• {language === 'ja' ? 'ソロ旅行者歓迎' : 'Solo traveler friendly'}</li>
              <li>• {language === 'ja' ? '大阪・京都エリア' : 'Osaka & Kyoto area'}</li>
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
