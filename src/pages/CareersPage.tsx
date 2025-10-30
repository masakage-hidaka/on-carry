import { Briefcase, Heart, TrendingUp, Users, Globe, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function CareersPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: '採用情報',
      subtitle: 'OnCarryで一緒に働きませんか？',
      intro: '私たちは、旅行業界に革新をもたらす情熱的な仲間を募集しています。',
      benefits: {
        title: 'OnCarryで働く理由',
        items: [
          {
            icon: Heart,
            title: '働きやすい環境',
            description: 'ワークライフバランスを重視。フレックスタイム制度あり。'
          },
          {
            icon: TrendingUp,
            title: '成長機会',
            description: 'スキルアップのための研修・セミナー費用を全額サポート。'
          },
          {
            icon: Users,
            title: '多様なチーム',
            description: '国際的なチームで、様々なバックグラウンドを持つ仲間と働けます。'
          },
          {
            icon: Globe,
            title: '国際的な環境',
            description: '世界中からのお客様と接し、グローバルな視点を養えます。'
          },
          {
            icon: Coffee,
            title: '充実した福利厚生',
            description: '社会保険完備、交通費支給、社員割引など。'
          },
          {
            icon: Briefcase,
            title: 'キャリアパス',
            description: '明確なキャリアパスと、実績に基づく昇進制度。'
          }
        ]
      },
      positions: {
        title: '募集職種',
        items: [
          {
            title: 'カスタマーサービス スタッフ',
            location: '難波トラベルハブ',
            type: '正社員 / アルバイト',
            description: 'お客様対応、荷物管理、予約管理などを担当。明るく、コミュニケーション能力の高い方を募集。',
            requirements: ['多言語対応可能な方（英語・中国語・韓国語など）', '接客経験者優遇', 'シフト勤務可能な方']
          },
          {
            title: 'マーケティング担当',
            location: '本社（大阪市中央区）',
            type: '正社員',
            description: 'SNS運営、広告キャンペーン企画、コンテンツ制作などを担当。デジタルマーケティング経験者優遇。',
            requirements: ['SNSマーケティング経験', 'Google Analytics等のツール使用経験', 'クリエイティブな発想力']
          },
          {
            title: 'エンジニア',
            location: 'リモート可',
            type: '正社員 / 契約社員',
            description: '予約システム、顧客管理システムの開発・運用。React、TypeScript、Supabase使用。',
            requirements: ['Web開発経験（2年以上）', 'React, TypeScript の実務経験', 'チーム開発経験']
          },
          {
            title: 'ドライバー（ハイヤーサービス）',
            location: '大阪市内',
            type: '業務委託',
            description: 'お客様の送迎を担当。安全運転と丁寧な接客が求められます。',
            requirements: ['普通自動車第二種免許保持', '大阪市内の地理に詳しい方', '英語または他言語対応可能な方優遇']
          }
        ]
      },
      process: {
        title: '選考プロセス',
        steps: [
          { step: 1, title: '応募', description: '履歴書・職務経歴書を送付' },
          { step: 2, title: '書類選考', description: '1週間以内に結果をご連絡' },
          { step: 3, title: '面接（1次）', description: 'オンラインまたは対面' },
          { step: 4, title: '面接（最終）', description: '経営陣との面談' },
          { step: 5, title: '内定', description: '条件面談・入社日調整' }
        ]
      },
      apply: {
        title: '応募方法',
        text: '下記のメールアドレスに、履歴書・職務経歴書を添付してお送りください。件名に「応募職種名」を明記してください。',
        email: 'careers@on-carry.com',
        note: '応募書類は返却いたしません。個人情報は採用選考のみに使用いたします。'
      }
    },
    en: {
      title: 'Careers',
      subtitle: 'Join the OnCarry Team',
      intro: 'We\'re looking for passionate people to bring innovation to the travel industry.',
      benefits: {
        title: 'Why Work at OnCarry',
        items: [
          {
            icon: Heart,
            title: 'Great Environment',
            description: 'Work-life balance focused. Flexible working hours available.'
          },
          {
            icon: TrendingUp,
            title: 'Growth Opportunities',
            description: 'Full support for training and seminar costs to improve your skills.'
          },
          {
            icon: Users,
            title: 'Diverse Team',
            description: 'Work with an international team of people from various backgrounds.'
          },
          {
            icon: Globe,
            title: 'International Environment',
            description: 'Interact with customers from around the world and develop a global perspective.'
          },
          {
            icon: Coffee,
            title: 'Excellent Benefits',
            description: 'Full social insurance, transportation allowance, employee discounts, and more.'
          },
          {
            icon: Briefcase,
            title: 'Career Path',
            description: 'Clear career paths and merit-based promotion system.'
          }
        ]
      },
      positions: {
        title: 'Open Positions',
        items: [
          {
            title: 'Customer Service Staff',
            location: 'Namba Travel Hub',
            type: 'Full-time / Part-time',
            description: 'Handle customer service, luggage management, and booking management. Looking for bright individuals with strong communication skills.',
            requirements: ['Multilingual ability (English, Chinese, Korean, etc.)', 'Customer service experience preferred', 'Available for shift work']
          },
          {
            title: 'Marketing Specialist',
            location: 'Head Office (Chuo-ku, Osaka)',
            type: 'Full-time',
            description: 'Manage social media, plan advertising campaigns, and create content. Digital marketing experience preferred.',
            requirements: ['SNS marketing experience', 'Experience with Google Analytics and similar tools', 'Creative thinking']
          },
          {
            title: 'Engineer',
            location: 'Remote available',
            type: 'Full-time / Contract',
            description: 'Develop and operate booking and customer management systems. Using React, TypeScript, Supabase.',
            requirements: ['Web development experience (2+ years)', 'React, TypeScript practical experience', 'Team development experience']
          },
          {
            title: 'Driver (Hire Service)',
            location: 'Osaka City',
            type: 'Contract',
            description: 'Handle customer transportation. Safe driving and courteous customer service required.',
            requirements: ['Type 2 ordinary driver\'s license', 'Familiar with Osaka city geography', 'English or other language ability preferred']
          }
        ]
      },
      process: {
        title: 'Selection Process',
        steps: [
          { step: 1, title: 'Application', description: 'Submit resume and CV' },
          { step: 2, title: 'Document Screening', description: 'Results within 1 week' },
          { step: 3, title: 'First Interview', description: 'Online or in-person' },
          { step: 4, title: 'Final Interview', description: 'Meeting with management' },
          { step: 5, title: 'Job Offer', description: 'Conditions discussion and start date' }
        ]
      },
      apply: {
        title: 'How to Apply',
        text: 'Please send your resume and CV to the email address below. Include the position name in the subject line.',
        email: 'careers@on-carry.com',
        note: 'Application documents will not be returned. Personal information will only be used for recruitment purposes.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-orange-50 mb-4">{t.subtitle}</p>
          <p className="text-lg text-orange-100">{t.intro}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.benefits.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.benefits.items.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.positions.title}</h2>
          <div className="space-y-6">
            {t.positions.items.map((position, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-300 transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        📍 {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        💼 {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    {language === 'ja' ? '応募する' : 'Apply'}
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{position.description}</p>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">
                    {language === 'ja' ? '必須/歓迎スキル：' : 'Requirements:'}
                  </p>
                  <ul className="space-y-1">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection Process */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.process.title}</h2>
          <div className="relative">
            {/* Connection Line */}
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

      {/* Apply Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-orange-50 rounded-2xl p-8 md:p-12 border-2 border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.apply.title}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{t.apply.text}</p>
          <div className="bg-white rounded-lg p-6 mb-6">
            <a href={`mailto:${t.apply.email}`} className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              {t.apply.email}
            </a>
          </div>
          <p className="text-sm text-gray-600">{t.apply.note}</p>
        </div>
      </div>
    </div>
  );
}
