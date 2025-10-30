import { Shield, MapPin, Clock, DollarSign, Star, ChevronRight } from 'lucide-react';
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
    <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
              <MapPin className="w-4 h-4" />
              {t.badge}
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {t.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 font-medium">
                {t.subheadline}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {t.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur rounded-lg p-4 border border-orange-200">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
              >
                {t.cta}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 font-bold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-orange-600"
              >
                {t.secondary}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-900 font-bold">{t.trust.rating}</span>
                <span className="text-gray-600 text-sm">{t.trust.reviews}</span>
              </div>
              <p className="text-gray-700 font-medium mb-4">
                {t.trust.travelers}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Travel Hub Namba Interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ja' ? '24時間監視' : '24/7 Surveillance'}
                  </p>
                  <p className="font-bold text-gray-900">
                    {language === 'ja' ? '完全保険付き' : 'Fully Insured'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  );
}
