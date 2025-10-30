import { Newspaper, Download, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PressPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'プレス・メディア',
      subtitle: 'OnCarryに関するニュースとメディア情報',
      pressKit: {
        title: 'プレスキット',
        description: 'メディア掲載用の資料をダウンロードいただけます。',
        items: [
          { name: '会社概要 (PDF)', size: '2.4 MB' },
          { name: 'ロゴ素材 (ZIP)', size: '5.1 MB' },
          { name: 'サービス紹介資料 (PDF)', size: '3.8 MB' },
          { name: '高解像度画像 (ZIP)', size: '12.3 MB' }
        ]
      },
      news: {
        title: '最新ニュース',
        items: [
          {
            date: '2025年11月15日',
            title: 'OnCarry、難波にTravel Hubを2025年12月1日オープン',
            excerpt: '株式会社オンキャリーは、大阪・難波に総合旅行サービス施設「Travel Hub Namba」を12月1日にオープンすることを発表しました。'
          },
          {
            date: '2025年10月20日',
            title: '多言語対応システムを導入、5言語でのサービス提供開始',
            excerpt: '旅行者の利便性向上のため、英語・中国語・韓国語など5言語に対応した予約・サポートシステムを導入しました。'
          },
          {
            date: '2025年9月5日',
            title: 'ハイヤーサービスのパートナー企業と提携',
            excerpt: '大阪市内の主要ハイヤー会社3社と提携し、プレミアムな移動サービスの提供を開始しました。'
          }
        ]
      },
      media: {
        title: 'メディア掲載',
        items: [
          { outlet: '大阪経済新聞', date: '2025年11月', title: '難波に新しい旅行者向けサービス施設オープン' },
          { outlet: 'Travel Weekly Japan', date: '2025年10月', title: 'スタートアップが挑む、旅行者支援の新しい形' },
          { outlet: 'Osaka Guide Magazine', date: '2025年9月', title: '荷物預かりサービスの革新' }
        ]
      },
      contact: {
        title: 'メディアお問い合わせ',
        text: '取材・掲載に関するお問い合わせは、下記までご連絡ください。',
        email: 'press@on-carry.com',
        name: '広報担当: 田中美咲',
        phone: '+81-6-XXXX-XXXX'
      }
    },
    en: {
      title: 'Press & Media',
      subtitle: 'News and Media Information about OnCarry',
      pressKit: {
        title: 'Press Kit',
        description: 'Download media materials for publication.',
        items: [
          { name: 'Company Overview (PDF)', size: '2.4 MB' },
          { name: 'Logo Assets (ZIP)', size: '5.1 MB' },
          { name: 'Service Introduction (PDF)', size: '3.8 MB' },
          { name: 'High-Resolution Images (ZIP)', size: '12.3 MB' }
        ]
      },
      news: {
        title: 'Latest News',
        items: [
          {
            date: 'November 15, 2025',
            title: 'OnCarry to Open Travel Hub in Namba on December 1, 2025',
            excerpt: 'OnCarry Inc. announced the opening of "Travel Hub Namba," a comprehensive travel service facility in Namba, Osaka, on December 1st.'
          },
          {
            date: 'October 20, 2025',
            title: 'Multilingual System Launch: Services Now Available in 5 Languages',
            excerpt: 'To improve traveler convenience, we introduced a booking and support system compatible with 5 languages including English, Chinese, and Korean.'
          },
          {
            date: 'September 5, 2025',
            title: 'Partnership with Premium Hire Service Companies',
            excerpt: 'Partnered with three major hire companies in Osaka to provide premium transportation services.'
          }
        ]
      },
      media: {
        title: 'Media Coverage',
        items: [
          { outlet: 'Osaka Business News', date: 'November 2025', title: 'New Traveler Service Facility Opens in Namba' },
          { outlet: 'Travel Weekly Japan', date: 'October 2025', title: 'Startup Tackles New Form of Traveler Support' },
          { outlet: 'Osaka Guide Magazine', date: 'September 2025', title: 'Innovation in Luggage Storage Services' }
        ]
      },
      contact: {
        title: 'Media Inquiries',
        text: 'For interview and publication inquiries, please contact:',
        email: 'press@on-carry.com',
        name: 'PR Contact: Misaki Tanaka',
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
          <Newspaper className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-orange-50">{t.subtitle}</p>
        </div>
      </div>

      {/* Press Kit */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">{t.pressKit.title}</h2>
          <p className="text-center text-gray-600 mb-12">{t.pressKit.description}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {t.pressKit.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.size}</p>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.news.title}</h2>
          <div className="space-y-8">
            {t.news.items.map((news, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-600">
                <p className="text-sm text-orange-600 font-semibold mb-2">{news.date}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{news.title}</h3>
                <p className="text-gray-700 leading-relaxed">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.media.title}</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {t.media.items.map((item, index) => (
              <div key={index} className={`p-6 ${index !== t.media.items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-orange-600 font-medium">{item.outlet}</p>
                  </div>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-8 md:p-12 border-2 border-orange-200">
          <Mail className="w-12 h-12 text-orange-600 mx-auto mb-6" />
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
