import { Calendar, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HowItWorksSection() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: '荷物預かりは3ステップで完了',
      subtitle: 'わずか2分で予約完了',
      steps: [
        {
          icon: Calendar,
          title: 'オンライン予約',
          description: '希望の日時とサイズを選んで予約。2分で完了します。',
          badge: 'STEP 1'
        },
        {
          icon: MapPin,
          title: '荷物をお預け',
          description: '難波のトラベルハブに荷物をお持ちください。QRコードで簡単チェックイン。',
          badge: 'STEP 2'
        },
        {
          icon: Heart,
          title: '手ぶらで観光',
          description: '大阪を思いっきり楽しんで！お好きな時間にお引き取りください。',
          badge: 'STEP 3'
        }
      ],
      cta: '予約を始める'
    },
    en: {
      title: 'Store Your Luggage in 3 Easy Steps',
      subtitle: 'Complete booking in just 2 minutes',
      steps: [
        {
          icon: Calendar,
          title: 'Book Online',
          description: 'Reserve your space in 2 minutes. Choose your preferred date and bag size.',
          badge: 'STEP 1'
        },
        {
          icon: MapPin,
          title: 'Drop Off',
          description: 'Bring luggage to our Namba location. Quick check-in with QR code.',
          badge: 'STEP 2'
        },
        {
          icon: Heart,
          title: 'Explore Freely',
          description: 'Enjoy Osaka hands-free! Pick up anytime during operating hours.',
          badge: 'STEP 3'
        }
      ],
      cta: 'Start Booking'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {t.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connecting Line (hidden on mobile) */}
                {index < t.steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 z-0"></div>
                )}

                {/* Step Card */}
                <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl z-10">
                  {/* Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {step.badge}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-2">
                    <div className="bg-white p-6 rounded-full shadow-lg">
                      <Icon className="w-12 h-12 text-orange-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg">
            {t.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}
