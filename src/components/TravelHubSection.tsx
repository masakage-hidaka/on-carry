import { MapPin, Clock, Heart, Package, Info, Sparkles, Calendar, Coffee, Map, Users, Luggage, Camera, UtensilsCrossed } from 'lucide-react';
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

      experiences: {
        title: 'Travel Hub Nambaで体験できること',
        subtitle: '日本の美しさと心地よさを、五感で味わう空間',
        items: [
          {
            icon: 'map',
            title: '旅行プランニングラウンジ',
            desc: '和紙の地図や季節のガイドブックを眺めながら、地元スタッフと一緒に京都・奈良・神戸への旅程を相談。茶室風の個室スペースでゆっくりプランニング。',
            image: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'coffee',
            title: '和カフェスペース',
            desc: '抹茶ラテや季節の和菓子を楽しめる軽飲食コーナー。木製カウンターに座り、障子越しの柔らかな光を浴びながら、旅の合間にひと息。',
            image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'camera',
            title: '日本文化体験コーナー',
            desc: '浴衣試着・茶道体験・書道・折り紙など、日本の伝統文化を気軽に体験。SNS映えする写真撮影スポットも完備。',
            image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'luggage',
            title: 'プレミアム荷物預かり',
            desc: '伝統工芸の木製ロッカーで大切な荷物を保管。受付では季節の生け花がお出迎え。手ぶらで大阪を満喫できます。',
            image: 'https://images.pexels.com/photos/6069748/pexels-photo-6069748.jpeg?auto=compress&cs=tinysrgb&w=800'
          }
        ]
      },

      atmosphere: {
        title: '五感で感じる「和」の空間',
        items: [
          { sense: '視覚', desc: '檜の格子、和紙照明、季節の生け花' },
          { sense: '触覚', desc: '天然木のカウンター、畳の座席' },
          { sense: '嗅覚', desc: '白檀のお香、挽きたての抹茶の香り' },
          { sense: '聴覚', desc: '水琴窟の音、静かな琴の調べ' },
          { sense: '味覚', desc: '職人が作る和菓子、本格抹茶' }
        ]
      },

      facilities: {
        title: '充実の館内設備',
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

      experiences: {
        title: 'Experience at Travel Hub Namba',
        subtitle: 'Engage all five senses in the beauty and comfort of Japan',
        items: [
          {
            icon: 'map',
            title: 'Travel Planning Lounge',
            desc: 'Plan your trips to Kyoto, Nara & Kobe with local staff using washi paper maps and seasonal guidebooks in a tea room-style private space.',
            image: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'coffee',
            title: 'Japanese Café Space',
            desc: 'Enjoy matcha lattes and seasonal wagashi at our light dining counter. Relax on wooden seats bathed in soft light through shoji screens.',
            image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'camera',
            title: 'Cultural Experience Corner',
            desc: 'Try yukata fitting, tea ceremony, calligraphy, origami and more. Instagram-worthy photo spots included.',
            image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            icon: 'luggage',
            title: 'Premium Luggage Storage',
            desc: 'Store your belongings in traditional wooden craft lockers. Greeted by seasonal ikebana at reception. Explore Osaka hands-free.',
            image: 'https://images.pexels.com/photos/6069748/pexels-photo-6069748.jpeg?auto=compress&cs=tinysrgb&w=800'
          }
        ]
      },

      atmosphere: {
        title: 'Experience "Wa" Through Five Senses',
        items: [
          { sense: 'Sight', desc: 'Hinoki lattice, washi lighting, seasonal ikebana' },
          { sense: 'Touch', desc: 'Natural wood counters, tatami seating' },
          { sense: 'Smell', desc: 'Sandalwood incense, fresh matcha aroma' },
          { sense: 'Sound', desc: 'Suikinkutsu water drops, gentle koto music' },
          { sense: 'Taste', desc: 'Artisan wagashi, authentic matcha' }
        ]
      },

      facilities: {
        title: 'Complete Facilities',
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

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <img
              src="https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Traditional Japanese interior with wooden elements"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <img
              src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Japanese room with tatami and shoji screens"
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

        {/* Experiences Section - NEW */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{t.experiences.title}</h2>
            <p className="text-xl text-amber-800">{t.experiences.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.experiences.items.map((exp, index) => {
              const icons = { map: Map, coffee: Coffee, camera: Camera, luggage: Luggage };
              const IconComponent = icons[exp.icon as keyof typeof icons];

              return (
                <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-amber-100 hover:border-amber-300 transition-all hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="bg-amber-500 rounded-full p-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Atmosphere Section - NEW */}
        <div className="bg-gradient-to-br from-red-900 via-amber-900 to-orange-900 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">{t.atmosphere.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {t.atmosphere.items.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 h-full">
                  <div className="text-4xl mb-3">
                    {index === 0 && '👁️'}
                    {index === 1 && '👋'}
                    {index === 2 && '👃'}
                    {index === 3 && '👂'}
                    {index === 4 && '👅'}
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-amber-200">{item.sense}</h4>
                  <p className="text-sm text-amber-50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities & Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Facilities */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-gray-900">{t.facilities.title}</h3>
            </div>
            <ul className="space-y-4">
              {t.facilities.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-amber-600 font-bold text-xl">✓</span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-gray-900">{t.info.title}</h3>
            </div>
            <div className="space-y-5 text-gray-700">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <MapPin className="w-5 h-5 inline text-amber-600 mr-2" />
                <strong>{language === 'ja' ? '住所：' : 'Address: '}</strong>
                <p className="ml-7 mt-1 text-gray-600">{t.info.address}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <strong>{language === 'ja' ? 'アクセス：' : 'Access: '}</strong>
                <ul className="ml-7 mt-1 space-y-1 text-gray-600">
                  {t.info.access.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Clock className="w-5 h-5 inline text-amber-600 mr-2" />
                <strong>{language === 'ja' ? '営業時間：' : 'Hours: '}</strong>
                <p className="ml-7 mt-1 text-gray-600">{t.info.hours.weekday}</p>
                <p className="ml-7 text-gray-600">{t.info.hours.weekend}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <strong>{language === 'ja' ? '面積：' : 'Space: '}</strong>
                <span className="text-gray-600"> {t.info.space}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-amber-200 mb-12">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Travel Hub Namba Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5156837!2d135.49816!3d34.66155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e71596f77a8f%3A0x5b0b0b0b0b0b0b0b!2z5Y2X5bqD44OT44Or!5e0!3m2!1sja!2sjp!4v1234567890"
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
