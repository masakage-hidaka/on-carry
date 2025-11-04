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
    <section className="relative bg-gradient-to-b from-red-50 via-amber-50 to-orange-50 py-20 px-4 overflow-hidden">
      {/* Traditional Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 1px, transparent 1px, transparent 10px),
                           repeating-linear-gradient(-45deg, #8B4513 0px, #8B4513 1px, transparent 1px, transparent 10px)`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section with Japanese Aesthetics */}
        <div className="text-center mb-16">
          {/* Cherry Blossom Accent */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white rounded-sm mb-6 font-bold shadow-lg border-2 border-amber-400">
                <Calendar className="w-5 h-5" />
                {t.openingDate}
              </div>
              {/* Gold accent lines */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-red-900 via-amber-900 to-red-900 bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
            {t.heroTitle}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-amber-600 mx-auto mb-6"></div>
          <p className="text-2xl md:text-3xl text-red-900 font-semibold mb-4" style={{ fontFamily: 'serif' }}>
            {t.heroSubtitle}
          </p>
          <p className="text-xl text-amber-900 italic">
            {t.tagline}
          </p>
        </div>

        {/* Mission Section - Japanese Style */}
        <div className="relative bg-gradient-to-br from-white via-red-50 to-amber-50 shadow-2xl p-8 md:p-12 mb-12 border-4 border-red-200">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-600"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-red-600"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-red-600"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-600"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-600"></div>
              <Heart className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-red-900" style={{ fontFamily: 'serif' }}>{t.mission.title}</h2>
              <Heart className="w-8 h-8 text-red-600" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-600"></div>
            </div>
            <h3 className="text-2xl font-semibold text-center text-amber-900 mb-6" style={{ fontFamily: 'serif' }}>{t.mission.subtitle}</h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              {t.mission.description}
            </p>
            <div className="relative bg-gradient-to-r from-red-100 via-amber-100 to-red-100 p-8 border-t-4 border-b-4 border-red-600">
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
              <p className="text-gray-900 italic text-lg mb-4 text-center" style={{ fontFamily: 'serif' }}>
                {t.mission.founderQuote}
              </p>
              <p className="text-center text-red-900 font-bold text-xl">
                — {t.mission.founderName}
              </p>
            </div>
          </div>
        </div>

        {/* Design Section - Deep Japanese Aesthetic */}
        <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-amber-950 shadow-2xl p-8 md:p-12 mb-12 text-white overflow-hidden">
          {/* Japanese wave pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="currentColor"/>
              <path d="M0,350 Q300,250 600,350 T1200,350 L1200,600 L0,600 Z" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  <h2 className="text-4xl font-bold" style={{ fontFamily: 'serif' }}>{t.design.title}</h2>
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              </div>
              <p className="text-2xl mt-6 text-amber-200" style={{ fontFamily: 'serif' }}>{t.design.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {t.design.features.map((feature, index) => (
                <div key={index} className="relative bg-gradient-to-br from-red-800/50 to-amber-900/50 backdrop-blur p-6 border-2 border-amber-600/50 group hover:border-amber-400 transition-all">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400"></div>

                  <h4 className="text-2xl font-bold mb-3 text-amber-300" style={{ fontFamily: 'serif' }}>{feature.title}</h4>
                  <p className="text-amber-50 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden border-4 border-amber-600 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Traditional Japanese interior with wooden elements"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 border-8 border-double border-amber-400/30 pointer-events-none"></div>
              </div>
              <div className="relative overflow-hidden border-4 border-amber-600 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Japanese room with tatami and shoji screens"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 border-8 border-double border-amber-400/30 pointer-events-none"></div>
              </div>
            </div>
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
                <div key={index} className="relative group bg-gradient-to-br from-white via-red-50 to-amber-50 shadow-xl overflow-hidden border-4 border-red-300 hover:border-red-500 transition-all hover:shadow-2xl">
                  {/* Traditional corner decorations */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-600 z-20"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-600 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-600 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-600 z-20"></div>

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/40 to-transparent"></div>
                    <div className="absolute inset-0 border-4 border-double border-amber-400/40"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-red-700 to-red-900 p-3 border-2 border-amber-400">
                        <IconComponent className="w-6 h-6 text-amber-200" />
                      </div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'serif' }}>{exp.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-red-600 to-amber-600"></div>
                    <p className="text-gray-800 leading-relaxed pt-4" style={{ fontFamily: 'serif' }}>{exp.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Atmosphere Section - Traditional Japanese Style */}
        <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-amber-950 shadow-2xl p-8 md:p-12 mb-12 text-white overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-block">
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'serif' }}>{t.atmosphere.title}</h2>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-amber-400 rotate-45"></div>
                  <div className="w-3 h-3 bg-amber-400 rotate-45"></div>
                  <div className="w-3 h-3 bg-amber-400 rotate-45"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {t.atmosphere.items.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative bg-gradient-to-br from-red-800/60 to-amber-900/60 backdrop-blur p-6 border-2 border-amber-600/50 h-full group hover:border-amber-400 transition-all">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-400"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-400"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-400"></div>

                    <div className="text-5xl mb-4">
                      {index === 0 && '👁️'}
                      {index === 1 && '👋'}
                      {index === 2 && '👃'}
                      {index === 3 && '👂'}
                      {index === 4 && '👅'}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-amber-300" style={{ fontFamily: 'serif' }}>{item.sense}</h4>
                    <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-3"></div>
                    <p className="text-sm text-amber-100 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

        {/* CTA - Traditional Japanese Style */}
        <div className="relative text-center bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl p-12 text-white overflow-hidden border-4 border-amber-600">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-400"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-amber-400"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-amber-400"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-400"></div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-6xl opacity-20">🌸</div>
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-6xl opacity-20">🌸</div>

          <div className="relative z-10">
            <p className="text-3xl mb-8 text-amber-100" style={{ fontFamily: 'serif' }}>{t.cta.subtitle}</p>
            <div className="flex justify-center gap-3 mb-8">
              <div className="w-4 h-4 bg-amber-400 rotate-45"></div>
              <div className="w-4 h-4 bg-amber-400 rotate-45"></div>
              <div className="w-4 h-4 bg-amber-400 rotate-45"></div>
            </div>
            <button className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-2xl py-5 px-16 border-4 border-amber-400 hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105 group">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              <span style={{ fontFamily: 'serif' }}>{t.cta.button}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
