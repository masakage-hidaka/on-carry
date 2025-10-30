import { Link2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SitemapPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'サイトマップ',
      subtitle: 'OnCarryのすべてのページ一覧',
      sections: [
        {
          title: 'サービス',
          links: [
            { name: 'ホーム', url: '#' },
            { name: '荷物預かり・配送', url: '#' },
            { name: 'ハイヤーサービス', url: '#' },
            { name: 'トラベルドクター', url: '#' },
            { name: 'ディナーコンパニオン', url: '#' },
            { name: '予約追跡', url: '#' }
          ]
        },
        {
          title: '会社情報',
          links: [
            { name: 'OnCarryについて', url: '#' },
            { name: 'チーム紹介', url: '#' },
            { name: '採用情報', url: '#' },
            { name: 'プレス・メディア', url: '#' },
            { name: 'パートナー募集', url: '#' }
          ]
        },
        {
          title: '法的情報',
          links: [
            { name: 'プライバシーポリシー', url: '#' },
            { name: '利用規約', url: '#' },
            { name: '返金ポリシー', url: '#' }
          ]
        },
        {
          title: 'アカウント',
          links: [
            { name: 'ログイン', url: '#' },
            { name: '新規登録', url: '#' },
            { name: 'マイページ', url: '#' }
          ]
        },
        {
          title: 'サポート',
          links: [
            { name: 'よくある質問', url: '#' },
            { name: 'お問い合わせ', url: '#' },
            { name: 'WhatsAppサポート', url: 'https://wa.me/447862123343' }
          ]
        }
      ]
    },
    en: {
      title: 'Sitemap',
      subtitle: 'All Pages of OnCarry',
      sections: [
        {
          title: 'Services',
          links: [
            { name: 'Home', url: '#' },
            { name: 'Luggage Storage & Delivery', url: '#' },
            { name: 'Hire Service', url: '#' },
            { name: 'Travel Doctor', url: '#' },
            { name: 'Dinner Companion', url: '#' },
            { name: 'Track Booking', url: '#' }
          ]
        },
        {
          title: 'Company',
          links: [
            { name: 'About OnCarry', url: '#' },
            { name: 'Our Team', url: '#' },
            { name: 'Careers', url: '#' },
            { name: 'Press & Media', url: '#' },
            { name: 'Partner with Us', url: '#' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { name: 'Privacy Policy', url: '#' },
            { name: 'Terms of Service', url: '#' },
            { name: 'Refund Policy', url: '#' }
          ]
        },
        {
          title: 'Account',
          links: [
            { name: 'Login', url: '#' },
            { name: 'Sign Up', url: '#' },
            { name: 'My Page', url: '#' }
          ]
        },
        {
          title: 'Support',
          links: [
            { name: 'FAQ', url: '#' },
            { name: 'Contact Us', url: '#' },
            { name: 'WhatsApp Support', url: 'https://wa.me/447862123343' }
          ]
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link2 className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-orange-50">{t.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-600">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'ja' ? 'お探しのページが見つかりませんか？' : 'Can\'t Find What You\'re Looking For?'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'ja'
              ? 'カスタマーサポートがお手伝いいたします。'
              : 'Our customer support team is here to help.'}
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            {language === 'ja' ? 'サポートに連絡' : 'Contact Support'}
          </button>
        </div>
      </div>
    </div>
  );
}
