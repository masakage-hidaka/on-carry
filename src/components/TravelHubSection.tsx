import { MapPin, Clock, Heart, Package, Info, Sparkles, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function TravelHubSection() {
  const { language } = useLanguage();

  const content = {
    ja: {
      openingDate: '2025年12月1日(月)オープン',
      heroTitle: 'トラベルハブなんば',
      heroSubtitle: '大阪・なんばに「日本のおもてなし」を体現する旅の拠点が誕生',
      tagline: '和の空間で"恩"を運ぶ、新しい旅のカタチ',

      mission: {
        title: 'OnCarryのミッション',
        subtitle: '「恩を運ぶ」という想い',
        description: '私たちOnCarryは、単なる荷物預かりサービスではありません。「人が人を支える」持続可能なビジネスモデルを通じて、旅行者一人ひとりの大切な思い出と、日本への感謝の気持ち(恩)を次へとつなぐことを使命としています。',
        founderQuote: '「働く一人ひとりが、自分の仕事に誇りを持てる社会を創りたい。誰のために、何のために働くのか。その想いを誇りに変え、誇りを力に変える。」',
        founderName: '代表取締役 塗野直透'
      },

      design: {
        title: '本物の「和」を感じる空間デザイン',
        subtitle: '日本の伝統美を現代に蘇らせた「和モダン」の内装',
        features: [
          {
            title: '木材の温もり',
            desc: '受付カウンターから看板、内装全体に天然木材を使用。まるで京都の町家や伝統的な料亭のような、木の質感と温もりで日本の「おもてなし」の心を表現'
          },
          {
            title: '障子や格子のデザイン',
            desc: '日本家屋の美しさを取り入れた障子風の間仕切りや繊細な格子細工で、落ち着いた和の雰囲気を演出'
          },
          {
            title: '和紙照明',
            desc: '職人が手がけた和紙製のペンダントライトが、柔らかな光で温かく旅行者を迎え入れます'
          },
          {
            title: '和のしつらえ',
            desc: '季節の生け花、掛け軸、伝統工芸品など、日本の美意識を随所に配置'
          }
        ]
      },

      services: {
        title: '3つの主要サービス',
        items: [
          {
            title: '心を込めた荷物預かりサービス',
            features: [
              '伝統的な木製収納家具を活用し、大切な荷物を丁寧に保管',
              'QRコード認証による24時間受取システム対応予定',
              'ホテルや空港への配送も可能'
            ]
          },
          {
            title: 'おもてなしの心を込めた観光案内所',
            features: [
              '多言語対応スタッフ（日本語・英語・韓国語・中国語等）',
              '地元民だからこそ知る隠れた名所やグルメ情報',
              '季節のイベントや文化体験のご紹介'
            ]
          },
          {
            title: '想いのこもった物販コーナー',
            features: [
              '日本の職人が丹精込めて作った工芸品',
              '大阪・関西の伝統文化を感じられるお土産品',
              '一つひとつの商品のストーリーもお伝えします'
            ]
          }
        ]
      },

      facilities: {
        title: '付加価値サービス',
        items: [
          'ドレッサースペース：アンティークの鏡台で身支度',
          '休憩スペース：木のぬくもりを感じる空間',
          '無料Wi-Fi：旅の計画や情報収集に'
        ]
      },

      info: {
        title: '施設概要',
        address: '大阪市浪速区難波中2丁目7番15号 南廣ビル1階',
        access: [
          '南海本線なんば駅より徒歩4分（関西国際空港から直結）',
          '大阪メトロ御堂筋線なんば駅より徒歩9分'
        ],
        space: '73.26㎡（22.2坪）',
        hours: {
          weekday: '平日：8:00〜20:00',
          weekend: '土日祝：7:00〜21:00'
        }
      },

      cta: {
        button: 'トラベルハブなんばへ',
        subtitle: '日本のおもてなしを、心から体験してください'
      }
    },
    en: {
      openingDate: 'Opening December 1st, 2025',
      heroTitle: 'Travel Hub Namba',
      heroSubtitle: 'A New Travel Hub Embodying Japanese Hospitality in Osaka Namba',
      tagline: 'Carrying Gratitude Through Traditional Japanese Spaces',

      mission: {
        title: 'OnCarry Mission',
        subtitle: 'Carrying Gratitude Forward',
        description: 'OnCarry is more than just a luggage storage service. Through a sustainable business model of "people supporting people," we are committed to connecting travelers\' precious memories with gratitude toward Japan.',
        founderQuote: '"I want to create a society where every worker can take pride in their job. To transform passion into pride, and pride into power."',
        founderName: 'CEO Naoto Nurino'
      },

      design: {
        title: 'Experience Authentic Japanese Design',
        subtitle: 'Modern Japanese Interior Reviving Traditional Beauty',
        features: [
          {
            title: 'Natural Wood Warmth',
            desc: 'Natural wood throughout - from reception counters to signage - creating the warmth of Kyoto machiya townhouses and traditional restaurants'
          },
          {
            title: 'Shoji & Lattice Design',
            desc: 'Incorporating the beauty of Japanese architecture with shoji-style partitions and delicate lattice work'
          },
          {
            title: 'Washi Paper Lighting',
            desc: 'Handcrafted washi paper pendant lights welcome travelers with soft, warm illumination'
          },
          {
            title: 'Japanese Aesthetics',
            desc: 'Seasonal ikebana, hanging scrolls, and traditional crafts placed throughout'
          }
        ]
      },

      services: {
        title: 'Three Core Services',
        items: [
          {
            title: 'Heartfelt Luggage Storage',
            features: [
              'Traditional wooden storage furniture for careful safekeeping',
              '24-hour pickup system with QR code authentication (planned)',
              'Hotel and airport delivery available'
            ]
          },
          {
            title: 'Hospitality-Focused Tourist Information',
            features: [
              'Multilingual staff (Japanese, English, Korean, Chinese, etc.)',
              'Local insider knowledge of hidden gems and gourmet spots',
              'Seasonal events and cultural experiences'
            ]
          },
          {
            title: 'Curated Artisan Products',
            features: [
              'Crafts made with care by Japanese artisans',
              'Osaka & Kansai traditional culture souvenirs',
              'Stories behind each product'
            ]
          }
        ]
      },

      facilities: {
        title: 'Additional Amenities',
        items: [
          'Dressing Space: Antique vanity mirrors',
          'Rest Area: Feel the warmth of wood',
          'Free Wi-Fi: Plan your journey'
        ]
      },

      info: {
        title: 'Facility Overview',
        address: 'Nanko Building 1F, 2-7-15 Namba-naka, Naniwa-ku, Osaka City',
        access: [
          '4-minute walk from Nankai Namba Station (direct from Kansai Airport)',
          '9-minute walk from Osaka Metro Namba Station'
        ],
        space: '73.26㎡ (22.2 tsubo)',
        hours: {
          weekday: 'Weekdays: 8:00-20:00',
          weekend: 'Weekends & Holidays: 7:00-21:00'
        }
      },

      cta: {
        button: 'Visit Travel Hub Namba',
        subtitle: 'Experience authentic Japanese hospitality'
      }
    }
  };

  const t = content[language];

  return (
    <section className="bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-full mb-6 font-semibold">
            <Calendar className="w-4 h-4" />
            {t.openingDate}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-2xl md:text-3xl text-amber-900 font-medium mb-4">
            {t.heroSubtitle}
          </p>
          <p className="text-xl text-amber-800">
            {t.tagline}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border-4 border-amber-200">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gray-900">{t.mission.title}</h2>
          </div>
          <h3 className="text-2xl font-semibold text-amber-800 mb-4">{t.mission.subtitle}</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t.mission.description}
          </p>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 border-l-4 border-amber-600">
            <p className="text-gray-800 italic text-lg mb-3">
              {t.mission.founderQuote}
            </p>
            <p className="text-right text-amber-900 font-semibold">
              — {t.mission.founderName}
            </p>
          </div>
        </div>

        {/* Design Section */}
        <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8" />
            <h2 className="text-3xl font-bold">{t.design.title}</h2>
          </div>
          <p className="text-xl mb-8 text-amber-100">{t.design.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {t.design.features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-bold mb-3 text-amber-200">{feature.title}</h4>
                <p className="text-amber-50">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <img
              src="https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Osaka Dotonbori street scene"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border-4 border-amber-200">
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900">{t.services.title}</h2>
          </div>

          <div className="space-y-8">
            {t.services.items.map((service, index) => (
              <div key={index} className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 font-bold mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities & Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Facilities */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.facilities.title}</h3>
            <ul className="space-y-3">
              {t.facilities.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-100">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-gray-900">{t.info.title}</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <MapPin className="w-5 h-5 inline text-amber-600 mr-2" />
                <strong>{language === 'ja' ? '住所：' : 'Address: '}</strong>
                <p className="ml-7 mt-1">{t.info.address}</p>
              </div>
              <div>
                <strong>{language === 'ja' ? 'アクセス：' : 'Access: '}</strong>
                <ul className="ml-7 mt-1 space-y-1">
                  {t.info.access.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Clock className="w-5 h-5 inline text-amber-600 mr-2" />
                <strong>{language === 'ja' ? '営業時間：' : 'Hours: '}</strong>
                <p className="ml-7 mt-1">{t.info.hours.weekday}</p>
                <p className="ml-7">{t.info.hours.weekend}</p>
              </div>
              <div>
                <strong>{language === 'ja' ? '面積：' : 'Space: '}</strong>
                {t.info.space}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-amber-200 mb-12">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Travel Hub Namba Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.4806!2d135.49983!3d34.66195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7146e1c5b3d%3A0x0!2zMzTCsDM5JzQzLjAiTiAxMzXCsDI5JzU5LjQiRQ!5e0!3m2!1sen!2sjp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl shadow-2xl p-12 text-white">
          <p className="text-2xl mb-6">{t.cta.subtitle}</p>
          <button className="bg-white text-amber-600 font-bold text-xl py-4 px-12 rounded-full hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            {t.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}
