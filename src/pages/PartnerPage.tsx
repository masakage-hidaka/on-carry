import { Handshake, TrendingUp, Users, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PartnerPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'パートナー募集',
      subtitle: '一緒に旅行業界を変えましょう',
      intro: 'OnCarryは、旅行者により良いサービスを提供するため、様々なパートナー企業と協力しています。',
      types: {
        title: 'パートナーシップの種類',
        items: [
          {
            icon: Globe,
            title: 'ホテル・宿泊施設',
            description: 'お客様に荷物配送サービスを提供し、チェックアウト後も観光を楽しんでいただけます。',
            benefits: ['宿泊客の満足度向上', '差別化されたサービス提供', '追加収益機会']
          },
          {
            icon: Users,
            title: '観光施設・アトラクション',
            description: '来場者が手ぶらで楽しめる環境を提供し、滞在時間の延長につながります。',
            benefits: ['来場者体験の向上', '施設内での消費促進', 'ブランド価値向上']
          },
          {
            icon: TrendingUp,
            title: '交通事業者',
            description: 'バス・タクシー会社との提携で、トータルな移動ソリューションを提供。',
            benefits: ['サービスの付加価値向上', '新規顧客獲得', '競争力強化']
          },
          {
            icon: Handshake,
            title: '旅行代理店・ツアー会社',
            description: 'お客様に総合的な旅行サポートを提供し、満足度の高いツアーを実現。',
            benefits: ['顧客満足度向上', 'ツアーの差別化', 'リピーター獲得']
          }
        ]
      },
      benefits: {
        title: 'パートナーになるメリット',
        items: [
          '相互送客による集客力アップ',
          'OnCarryプラットフォームでの露出',
          '共同マーケティング施策',
          'API連携による業務効率化',
          '専任担当者によるサポート',
          '定期的な実績レポート'
        ]
      },
      requirements: {
        title: '募集条件',
        text: '以下のような企業・団体の皆様からのご連絡をお待ちしております。',
        items: [
          '旅行・観光業界で事業を展開されている方',
          '顧客体験の向上に積極的な方',
          '長期的なパートナーシップを希望される方',
          '大阪市内、またはその近郊で営業されている方'
        ]
      },
      process: {
        title: 'パートナーシップまでの流れ',
        steps: [
          { step: 1, title: 'お問い合わせ', description: 'フォームまたはメールでご連絡' },
          { step: 2, title: '面談', description: 'ビジネスモデルのご説明' },
          { step: 3, title: '提案書作成', description: '具体的な連携内容の検討' },
          { step: 4, title: '契約', description: '契約書の締結' },
          { step: 5, title: '開始', description: 'パートナーシップ開始' }
        ]
      },
      contact: {
        title: 'お問い合わせ',
        text: 'パートナーシップにご興味をお持ちの方は、下記までご連絡ください。',
        email: 'partners@on-carry.com',
        name: 'ビジネス開発担当: 山田健太',
        phone: '+81-6-XXXX-XXXX'
      }
    },
    en: {
      title: 'Partner with Us',
      subtitle: 'Let\'s Transform the Travel Industry Together',
      intro: 'OnCarry collaborates with various partner companies to provide better services to travelers.',
      types: {
        title: 'Partnership Types',
        items: [
          {
            icon: Globe,
            title: 'Hotels & Accommodations',
            description: 'Provide luggage delivery service to guests, allowing them to enjoy sightseeing after checkout.',
            benefits: ['Improved guest satisfaction', 'Differentiated service offering', 'Additional revenue opportunities']
          },
          {
            icon: Users,
            title: 'Tourist Attractions',
            description: 'Create a hands-free environment for visitors, leading to longer stays.',
            benefits: ['Enhanced visitor experience', 'Increased in-facility spending', 'Elevated brand value']
          },
          {
            icon: TrendingUp,
            title: 'Transportation Providers',
            description: 'Partnership with bus and taxi companies to provide comprehensive transportation solutions.',
            benefits: ['Enhanced service value', 'New customer acquisition', 'Strengthened competitiveness']
          },
          {
            icon: Handshake,
            title: 'Travel Agencies & Tour Operators',
            description: 'Provide comprehensive travel support to customers, creating highly satisfying tours.',
            benefits: ['Improved customer satisfaction', 'Tour differentiation', 'Repeat customer acquisition']
          }
        ]
      },
      benefits: {
        title: 'Partner Benefits',
        items: [
          'Increased customer acquisition through mutual referrals',
          'Exposure on OnCarry platform',
          'Joint marketing initiatives',
          'Business efficiency through API integration',
          'Dedicated account manager support',
          'Regular performance reports'
        ]
      },
      requirements: {
        title: 'Requirements',
        text: 'We welcome inquiries from companies and organizations that meet the following criteria:',
        items: [
          'Operating in the travel and tourism industry',
          'Actively pursuing customer experience improvement',
          'Seeking long-term partnerships',
          'Operating in Osaka City or surrounding areas'
        ]
      },
      process: {
        title: 'Partnership Process',
        steps: [
          { step: 1, title: 'Inquiry', description: 'Contact via form or email' },
          { step: 2, title: 'Meeting', description: 'Business model explanation' },
          { step: 3, title: 'Proposal', description: 'Discuss specific collaboration details' },
          { step: 4, title: 'Contract', description: 'Sign agreement' },
          { step: 5, title: 'Launch', description: 'Partnership begins' }
        ]
      },
      contact: {
        title: 'Contact Us',
        text: 'If you\'re interested in partnership opportunities, please contact:',
        email: 'partners@on-carry.com',
        name: 'Business Development: Kenta Yamada',
        phone: '+81-6-XXXX-XXXX'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Handshake className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-orange-50 mb-4">{t.subtitle}</p>
          <p className="text-lg text-orange-100">{t.intro}</p>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.types.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.types.items.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{type.description}</p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.benefits.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.benefits.items.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">{t.requirements.title}</h2>
          <p className="text-center text-gray-600 mb-12">{t.requirements.text}</p>
          <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200">
            <ul className="space-y-4">
              {t.requirements.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-orange-600 text-xl mt-1">✓</span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.process.title}</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-orange-200"></div>
            <div className="grid md:grid-cols-5 gap-8 relative">
              {t.process.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-8 md:p-12 border-2 border-orange-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">{t.contact.title}</h2>
          <p className="text-center text-gray-700 mb-8">{t.contact.text}</p>
          <div className="bg-white rounded-xl p-6 text-center space-y-3">
            <p className="font-semibold text-gray-900">{t.contact.name}</p>
            <a href={`mailto:${t.contact.email}`} className="block text-xl font-bold text-orange-600 hover:text-orange-700">
              {t.contact.email}
            </a>
            <p className="text-gray-600">{t.contact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
