import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PricingSection() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'シンプルで透明な料金',
      subtitle: '隠れた費用なし。2時間前まで無料キャンセル。',
      plans: [
        {
          name: '小型バッグ',
          price: '¥500',
          period: '/日',
          size: '最大20L',
          examples: ['バックパック', 'デイパック', '小型トート'],
          popular: false
        },
        {
          name: '中型バッグ',
          price: '¥700',
          period: '/日',
          size: '最大40L',
          examples: ['機内持込サイズ', '小型スーツケース', 'ダッフルバッグ'],
          popular: true
        },
        {
          name: '大型バッグ',
          price: '¥1,000',
          period: '/日',
          size: '最大70L',
          examples: ['大型スーツケース', '複数のバッグ', 'ゴルフバッグ'],
          popular: false
        }
      ],
      features: [
        '24時間監視システム',
        '完全保険付き',
        'QRコードで簡単チェックイン',
        '柔軟な引き取り時間'
      ],
      note: '長期保管をご希望ですか？',
      noteLink: '週間・月間料金についてお問い合わせください',
      comparison: 'コインロッカーが満杯？OnCarryなら柔軟で安全です。'
    },
    en: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'No hidden fees. Cancel free up to 2 hours before.',
      plans: [
        {
          name: 'Small Bag',
          price: '¥500',
          period: '/day',
          size: 'Up to 20L',
          examples: ['Backpacks', 'Daypacks', 'Small totes'],
          popular: false
        },
        {
          name: 'Medium Bag',
          price: '¥700',
          period: '/day',
          size: 'Up to 40L',
          examples: ['Carry-ons', 'Small suitcase', 'Duffel bags'],
          popular: true
        },
        {
          name: 'Large Bag',
          price: '¥1,000',
          period: '/day',
          size: 'Up to 70L',
          examples: ['Large suitcases', 'Multiple bags', 'Golf bags'],
          popular: false
        }
      ],
      features: [
        '24/7 surveillance system',
        'Fully insured',
        'QR code easy check-in',
        'Flexible pickup times'
      ],
      note: 'Long-term storage?',
      noteLink: 'Contact us for weekly/monthly rates',
      comparison: 'Coin lockers full? Our space is flexible and secure.'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {t.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-2xl ${
                plan.popular
                  ? 'border-orange-500 shadow-xl transform scale-105'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                  {language === 'ja' ? '人気' : 'POPULAR'}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 text-lg">{plan.period}</span>
              </div>

              {/* Size */}
              <p className="text-orange-600 font-semibold mb-4">
                {plan.size}
              </p>

              {/* Examples */}
              <ul className="space-y-3 mb-8">
                {plan.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  plan.popular
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {language === 'ja' ? '選択' : 'Select'}
              </button>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-orange-50 rounded-2xl p-8 mb-8 border border-orange-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'ja' ? 'すべてのプランに含まれるもの' : 'Included with Every Plan'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">{t.note}</span>{' '}
            <a href="#contact" className="text-orange-600 hover:text-orange-700 underline font-medium">
              {t.noteLink}
            </a>
          </p>
          <p className="text-gray-600 italic">
            {t.comparison}
          </p>
        </div>
      </div>
    </section>
  );
}
