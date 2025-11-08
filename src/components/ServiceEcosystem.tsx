import { Package, Car, Stethoscope, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceEcosystemProps {
  onNavigate: (page: string) => void;
}

export function ServiceEcosystem({ onNavigate }: ServiceEcosystemProps) {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'すべてが揃う旅行体験',
      subtitle: '大阪での完璧な旅をワンストップでサポート',
      services: [
        {
          id: 'porter',
          icon: Package,
          name: 'Travel Porter',
          subtitle: '荷物預かり & 配送',
          description: '手ぶらで観光を楽しむ。ホテル・空港への配送も',
          route: 'book',
          features: ['QR予約', '24h監視', '保険付き']
        },
        {
          id: 'hire',
          icon: Car,
          name: 'Travel Hire',
          subtitle: 'プレミアム送迎',
          description: 'プロドライバー付き車両で快適な移動',
          route: 'hire',
          features: ['4車種', '時間制', '英語対応']
        },
        {
          id: 'doctor',
          icon: Stethoscope,
          name: 'Travel Doctor',
          subtitle: 'オンライン医療相談',
          description: '旅行中の健康をサポート',
          route: 'doctor',
          features: ['多言語', '即対応', 'ビデオ通話']
        },
        {
          id: 'dinner',
          icon: UtensilsCrossed,
          name: 'Dinner Companion',
          subtitle: '食事ガイド同行',
          description: '地元の美味しさを案内',
          route: 'dinner',
          features: ['地元案内', 'ソロ歓迎', '当日予約']
        }
      ]
    },
    en: {
      title: 'Everything You Need',
      subtitle: 'Complete Travel Experience in Osaka',
      services: [
        {
          id: 'porter',
          icon: Package,
          name: 'Travel Porter',
          subtitle: 'Luggage Storage & Delivery',
          description: 'Travel hands-free with hotel & airport delivery',
          route: 'book',
          features: ['QR Booking', '24/7 Monitor', 'Insured']
        },
        {
          id: 'hire',
          icon: Car,
          name: 'Travel Hire',
          subtitle: 'Premium Transportation',
          description: 'Professional driver service for comfortable travel',
          route: 'hire',
          features: ['4 Types', 'Hourly', 'English OK']
        },
        {
          id: 'doctor',
          icon: Stethoscope,
          name: 'Travel Doctor',
          subtitle: 'Online Medical Consultation',
          description: 'Healthcare support during your trip',
          route: 'doctor',
          features: ['Multilingual', 'Instant', 'Video Call']
        },
        {
          id: 'dinner',
          icon: UtensilsCrossed,
          name: 'Dinner Companion',
          subtitle: 'Dining Guide Service',
          description: 'Discover local cuisine with a guide',
          route: 'dinner',
          features: ['Local Guide', 'Solo Welcome', 'Same Day']
        }
      ]
    }
  };

  const t = content[language];

  const colors = [
    'from-blue-600 to-cyan-600',
    'from-emerald-600 to-teal-600',
    'from-rose-600 to-pink-600',
    'from-violet-600 to-purple-600'
  ];

  return (
    <section className="relative bg-white py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.04),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.04),transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative cursor-pointer"
                onClick={() => onNavigate(service.route)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>

                <div className="relative bg-white rounded-3xl shadow-lg shadow-black/5 border border-gray-100 group-hover:shadow-2xl group-hover:shadow-orange-500/10 transition-all duration-500 group-hover:scale-105 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors[index]}`}></div>

                  <div className="p-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl"></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-lg font-bold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-500 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/30">
                      <span>{language === 'ja' ? '詳しく見る' : 'Learn More'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-lg text-gray-600 font-medium max-w-2xl">
              {language === 'ja'
                ? 'すべてのサービスを Travel Hub Namba でご利用いただけます'
                : 'All services available at Travel Hub Namba'}
            </p>
            <button
              onClick={() => onNavigate('book')}
              className="group relative overflow-hidden px-10 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3">
                {language === 'ja' ? '今すぐ予約' : 'Book Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
