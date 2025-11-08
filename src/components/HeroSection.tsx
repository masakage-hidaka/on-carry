import { Shield, MapPin, Clock, DollarSign, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onBookNow: () => void;
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  const { language } = useLanguage();

  const content = {
    ja: {
      badge: '南海なんば駅から徒歩4分',
      headline: '大阪を手ぶらで旅する',
      subheadline: '難波の中心地で安全・便利な荷物預かりサービス',
      benefits: [
        { icon: Shield, text: '安全・保険付き' },
        { icon: MapPin, text: '駅から4分' },
        { icon: Clock, text: '柔軟な営業時間' },
        { icon: DollarSign, text: '¥500/日から' }
      ],
      cta: '今すぐ予約',
      secondary: 'すべてのサービスを見る',
      trust: {
        rating: '4.9/5',
        reviews: '(1,247件のレビュー)',
        travelers: '15,000人以上の旅行者が信頼'
      },
      features: [
        '2時間前まで無料キャンセル',
        '年中無休営業',
        '多言語対応スタッフ'
      ]
    },
    en: {
      badge: '4 min from Nankai Namba Station',
      headline: 'Travel Light Through Osaka',
      subheadline: 'Secure Luggage Storage in the Heart of Namba',
      benefits: [
        { icon: Shield, text: 'Secure & Insured' },
        { icon: MapPin, text: '4 Min from Station' },
        { icon: Clock, text: 'Flexible Hours' },
        { icon: DollarSign, text: 'From ¥500/day' }
      ],
      cta: 'Book Storage Now',
      secondary: 'See All Services',
      trust: {
        rating: '4.9/5',
        reviews: '(1,247 reviews)',
        travelers: 'Trusted by 15,000+ travelers'
      },
      features: [
        'Free cancellation up to 2 hours before',
        'Open 7 days/week',
        'Multilingual staff'
      ]
    }
  };

  const t = content[language];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/30">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-bold shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-500 group cursor-pointer">
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t.badge}</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {t.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl">
                {t.subheadline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                    <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/50 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-orange-500/10 transition-all duration-500 group-hover:scale-105">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{benefit.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="group relative overflow-hidden px-8 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  {t.cta}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="group px-8 py-5 rounded-2xl text-lg font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-500 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  {t.secondary}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border-2 border-white shadow-lg"
                    ></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{t.trust.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{t.trust.reviews}</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <p className="text-sm font-semibold text-gray-600">{t.trust.travelers}</p>
            </div>
          </div>

          <div className="relative lg:h-[700px] group">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl opacity-20 blur-3xl group-hover:opacity-30 transition duration-1000"></div>

            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
              <img
                src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Traveler with luggage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50">
                  <div className="space-y-3">
                    {t.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
    </div>
  );
}
