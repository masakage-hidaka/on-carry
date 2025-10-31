import { Package, Car, Stethoscope, UtensilsCrossed, Star, Users, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { TravelHubSection } from '../components/TravelHubSection';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PricingSection } from '../components/PricingSection';
import { ServiceEcosystem } from '../components/ServiceEcosystem';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { language } = useLanguage();

  const services = [
    {
      id: 'porter',
      icon: Package,
      titleJa: 'ポーターサービス',
      titleEn: 'Luggage Storage & Delivery',
      descJa: '荷物の一時預かり、ホテル間配送、空港送迎。QRコードで簡単チェックイン・チェックアウト。',
      descEn: 'Secure luggage storage, hotel-to-hotel delivery, and airport transfers. Easy QR code check-in.',
      features: ['ja', 'en'].map(lang => lang === 'ja' ? [
        'ホテル間の荷物配送',
        '関西国際空港送迎',
        'QRコード簡単予約',
        'リアルタイム追跡'
      ] : [
        'Hotel-to-hotel luggage delivery',
        'Kansai Airport transfer',
        'Easy booking with QR code',
        'Real-time tracking'
      ])[language === 'ja' ? 0 : 1],
      route: 'book'
    },
    {
      id: 'hire',
      icon: Car,
      titleJa: 'ハイヤーサービス',
      titleEn: 'Travel Hire',
      descJa: 'プロドライバー付きプレミアム車両。時間貸し・終日対応、複数車両タイプから選択可能。',
      descEn: 'Premium car service with professional driver. Hourly or full-day rental with multiple vehicle options.',
      features: ['ja', 'en'].map(lang => lang === 'ja' ? [
        'プロドライバー付き',
        '時間貸し・終日対応',
        '複数車両タイプ',
        'API連携パートナー'
      ] : [
        'Professional driver included',
        'Hourly or full-day rental',
        'Multiple vehicle types',
        'API-integrated partners'
      ])[language === 'ja' ? 0 : 1],
      route: 'hire'
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      titleJa: 'トラベルドクター',
      titleEn: 'Travel Doctor',
      descJa: 'オンライン医療相談サービス。多言語対応、緊急相談可能、ビデオ通話対応。',
      descEn: 'Online medical consultation service. Multilingual support, emergency consultations available, video calls ready.',
      features: ['ja', 'en'].map(lang => lang === 'ja' ? [
        'オンライン医療相談',
        '多言語対応',
        '緊急相談可能',
        'ビデオ通話対応'
      ] : [
        'Online medical consultation',
        'Multi-language support',
        'Emergency consultation available',
        'Video consultation ready'
      ])[language === 'ja' ? 0 : 1],
      route: 'doctor'
    },
    {
      id: 'dinner',
      icon: UtensilsCrossed,
      titleJa: 'ディナーコンパニオン',
      titleEn: 'Dinner Companion',
      descJa: '地元ガイド同行の食事体験。直前予約対応、ソロ旅行者歓迎、大阪・京都エリア。',
      descEn: 'Local dining experiences with guide. Last-minute booking accepted, solo traveler friendly, Osaka & Kyoto area.',
      features: ['ja', 'en'].map(lang => lang === 'ja' ? [
        '地元ガイド同行',
        '直前予約対応（1時間前まで）',
        'ソロ旅行者歓迎',
        '大阪・京都エリア'
      ] : [
        'Local guide accompaniment',
        'Last-minute booking (up to 1hr before)',
        'Solo traveler friendly',
        'Osaka & Kyoto area'
      ])[language === 'ja' ? 0 : 1],
      route: 'dinner'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Luggage Storage Focus */}
      <HeroSection onBookNow={() => onNavigate('book')} />

      {/* Service Ecosystem - Overview of all 5 services */}
      <ServiceEcosystem onNavigate={onNavigate} />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Why Choose OnCarry - Value Propositions */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {language === 'ja' ? '旅行者がOnCarryを信頼する理由' : 'Why Travelers Trust OnCarry'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {language === 'ja' ? 'セキュリティ第一' : 'Security First'}
              </h3>
              <ul className="space-y-2 text-orange-50">
                <li>• {language === 'ja' ? '24時間監視' : '24/7 surveillance'}</li>
                <li>• {language === 'ja' ? '完全保険付き' : 'Fully insured'}</li>
                <li>• {language === 'ja' ? 'スタッフ常駐' : 'Staff on-site'}</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {language === 'ja' ? '最高の立地' : 'Prime Location'}
              </h3>
              <ul className="space-y-2 text-orange-50">
                <li>• {language === 'ja' ? '駅から4分' : '4 min from station'}</li>
                <li>• {language === 'ja' ? '難波の中心地' : 'Heart of Namba'}</li>
                <li>• {language === 'ja' ? 'アクセス簡単' : 'Easy access'}</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {language === 'ja' ? 'ワンストップ' : 'All-in-One'}
              </h3>
              <ul className="space-y-2 text-orange-50">
                <li>• {language === 'ja' ? '8つのサービス、1つの場所' : '8 services, 1 place'}</li>
                <li>• {language === 'ja' ? '多言語サポート' : 'Multilingual support'}</li>
                <li>• {language === 'ja' ? '年中無休' : 'Open 7 days/week'}</li>
              </ul>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-2xl font-bold ml-2">4.9/5</span>
            </div>
            <p className="text-xl mb-6">
              {language === 'ja' ? '1,247件のレビュー' : '1,247 reviews on Google'}
            </p>
            <p className="text-2xl font-bold">
              {language === 'ja' ? '15,000人以上の旅行者が信頼' : 'Trusted by 15,000+ travelers'}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Comprehensive Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'ja' ? 'ただの荷物預かりではありません' : 'More Than Storage'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'ja' ? 'あなたのワンストップ旅行ハブ' : 'Your One-Stop Travel Hub'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-300 cursor-pointer group"
                  onClick={() => onNavigate(service.route)}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-orange-100 group-hover:bg-orange-200 p-4 rounded-xl transition-colors">
                      <Icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'ja' ? service.titleJa : service.titleEn}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ja' ? service.descJa : service.descEn}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 text-orange-600 font-semibold group-hover:underline">
                    {language === 'ja' ? '詳細を見る →' : 'Learn More →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel Hub Section */}
      <TravelHubSection />

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'ja' ? '手ぶらで大阪を探索する準備はできましたか？' : 'Ready to Explore Osaka Hands-Free?'}
          </h2>
          <p className="text-xl mb-8 text-orange-50">
            {language === 'ja' ? '今すぐ荷物預かりを予約して、安心して旅行しましょう' : 'Book your luggage storage now and travel with peace of mind'}
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="inline-flex items-center gap-2 px-12 py-5 bg-white hover:bg-gray-50 text-orange-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-xl"
          >
            {language === 'ja' ? '今すぐ予約' : 'Book Storage Now'}
          </button>
          <p className="mt-6 text-orange-100">
            {language === 'ja' ? '15,000人以上の幸せな旅行者が OnCarryを信頼' : 'Join 15,000+ happy travelers who trusted OnCarry'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
