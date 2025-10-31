import { Building2, Package, Car, Stethoscope, UtensilsCrossed, ArrowRight, Info, Ticket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceEcosystemProps {
  onNavigate: (page: string) => void;
}

export function ServiceEcosystem({ onNavigate }: ServiceEcosystemProps) {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'OnCarry サービスエコシステム',
      subtitle: '大阪での完璧な旅行体験をトータルサポート',
      hub: {
        name: 'Travel Hub',
        location: '難波',
        desc: '観光案内 & チケット予約'
      },
      services: [
        {
          id: 'porter',
          icon: Package,
          name: 'Travel Porter',
          subtitle: '荷物預かり & 配送',
          description: '手ぶらで観光、ホテル・空港配送',
          route: 'book',
          color: 'from-blue-500 to-blue-600',
          features: ['QR予約', '24h監視', '保険付き']
        },
        {
          id: 'hire',
          icon: Car,
          name: 'Travel Hire',
          subtitle: 'プレミアム送迎',
          description: 'プロドライバー付き車両サービス',
          route: 'hire',
          color: 'from-green-500 to-green-600',
          features: ['4車種', '時間制', '英語対応']
        },
        {
          id: 'doctor',
          icon: Stethoscope,
          name: 'Travel Doctor',
          subtitle: 'オンライン医療相談',
          description: '旅行中の健康サポート',
          route: 'doctor',
          color: 'from-red-500 to-red-600',
          features: ['多言語', '即対応', 'ビデオ通話']
        },
        {
          id: 'dinner',
          icon: UtensilsCrossed,
          name: 'Dinner Companion',
          subtitle: '食事ガイド同行',
          description: '地元の美味しいを案内',
          route: 'dinner',
          color: 'from-purple-500 to-purple-600',
          features: ['地元案内', 'ソロ歓迎', '当日予約']
        }
      ]
    },
    en: {
      title: 'OnCarry Service Ecosystem',
      subtitle: 'Complete Travel Experience Support in Osaka',
      hub: {
        name: 'Travel Hub',
        location: 'Namba',
        desc: 'Tourist Info & Ticket Booking'
      },
      services: [
        {
          id: 'porter',
          icon: Package,
          name: 'Travel Porter',
          subtitle: 'Luggage Storage & Delivery',
          description: 'Hands-free sightseeing, hotel & airport delivery',
          route: 'book',
          color: 'from-blue-500 to-blue-600',
          features: ['QR Booking', '24/7 Monitor', 'Insured']
        },
        {
          id: 'hire',
          icon: Car,
          name: 'Travel Hire',
          subtitle: 'Premium Transportation',
          description: 'Professional driver service',
          route: 'hire',
          color: 'from-green-500 to-green-600',
          features: ['4 Types', 'Hourly', 'English OK']
        },
        {
          id: 'doctor',
          icon: Stethoscope,
          name: 'Travel Doctor',
          subtitle: 'Online Medical Consultation',
          description: 'Healthcare support during travel',
          route: 'doctor',
          color: 'from-red-500 to-red-600',
          features: ['Multilingual', 'Instant', 'Video Call']
        },
        {
          id: 'dinner',
          icon: UtensilsCrossed,
          name: 'Dinner Companion',
          subtitle: 'Dining Guide Service',
          description: 'Local food experience guide',
          route: 'dinner',
          color: 'from-purple-500 to-purple-600',
          features: ['Local Guide', 'Solo Welcome', 'Same Day']
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, orange 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Ecosystem Diagram */}
        <div className="relative">
          {/* Central Hub */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ width: '800px', height: '600px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                {/* Lines from center to each service */}
                <line x1="400" y1="300" x2="400" y2="100" stroke="url(#gradient1)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="400" y1="300" x2="150" y2="450" stroke="url(#gradient2)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                <line x1="400" y1="300" x2="650" y2="450" stroke="url(#gradient3)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                <line x1="400" y1="300" x2="150" y2="150" stroke="url(#gradient4)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                <line x1="400" y1="300" x2="650" y2="150" stroke="url(#gradient5)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Hub Card */}
              <div className="relative z-20 bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl shadow-2xl p-8 max-w-md mx-auto border-4 border-white transform hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('home')}>
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{t.hub.name}</h3>
                  <p className="text-orange-100 text-lg mb-1">{t.hub.location}</p>
                  <p className="text-orange-50 font-medium">{t.hub.desc}</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                      <Info className="w-4 h-4" />
                      {language === 'ja' ? '観光案内' : 'Tourist Info'}
                    </span>
                    <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                      <Ticket className="w-4 h-4" />
                      {language === 'ja' ? 'チケット' : 'Tickets'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-gray-100 hover:border-orange-300"
                  onClick={() => onNavigate(service.route)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-10 h-10" />
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
                    <p className="text-white/90 text-sm font-medium">{service.subtitle}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="mt-4 w-full bg-gray-100 hover:bg-orange-100 text-gray-900 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-orange-100">
                      {language === 'ja' ? '詳しく見る' : 'Learn More'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-6">
            {language === 'ja'
              ? 'すべてのサービスを Travel Hub Namba でご利用いただけます'
              : 'All services available at Travel Hub Namba'}
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {language === 'ja' ? '今すぐ予約' : 'Book Now'}
          </button>
        </div>
      </div>
    </section>
  );
}
