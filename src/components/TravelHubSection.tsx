import { MapPin, Calendar, Sparkles, Building2, Users2, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function TravelHubSection() {
  const { language } = useLanguage();

  const content = {
    ja: {
      badge: 'Coming Soon',
      date: '2025年12月1日(月)',
      title: 'Travel Hub Namba',
      subtitle: '大阪・なんばに、日本のおもてなしを体現する旅の拠点が誕生',
      description: '伝統的な和の美しさと最先端のテクノロジーが融合した、まったく新しい旅行者体験をお届けします。',
      features: [
        { label: '荷物預かり', desc: '24時間監視・保険付き' },
        { label: '観光案内', desc: '多言語対応スタッフ' },
        { label: '和カフェ', desc: '抹茶・和菓子' },
        { label: '文化体験', desc: '浴衣・茶道・書道' }
      ],
      company: {
        title: '会社概要',
        name: '株式会社オンキャリー',
        nameEn: 'OnCarry Co., Ltd.',
        established: '2025年7月15日',
        address: '〒541-0047 大阪市中央区安土町2丁目5-5 本町明大ビル802',
        phone: 'TEL. 06-7777-2759',
        corporateNumber: '法人番号 7120001278022',
        bank: '取引銀行 三井住友銀行',
        capital: '資本金 500万円',
        business: '配車サービス及び荷物輸送に関する事業、医療プラットフォーム事業',
        social: {
          title: 'SNS',
          instagram: 'https://www.instagram.com/on_carry.jp/',
          facebook: 'https://www.facebook.com/61579345594924',
        },
        executives: [
          { role: '代表取締役', name: '塗野 直透', nameEn: 'Naoto Nurino' },
          { role: '取締役', name: '日髙 将景', nameEn: 'Masakage Hidaka' },
          { role: 'CLO', name: '堀江 哲史', nameEn: 'Satoshi Horie' },
          { role: '顧問', name: '元田 宅映', nameEn: 'Takuei Motoda' },
          { role: '顧問', name: '小林 雅紀', nameEn: 'Masanori Kobayashi' }
        ]
      }
    },
    en: {
      badge: 'Coming Soon',
      date: 'Opening December 1, 2025',
      title: 'Travel Hub Namba',
      subtitle: 'A new travel hub embodying Japanese hospitality in Osaka Namba',
      description: 'Experience the fusion of traditional Japanese aesthetics and cutting-edge technology for a completely new traveler experience.',
      features: [
        { label: 'Luggage Storage', desc: '24/7 monitoring & insured' },
        { label: 'Tourist Info', desc: 'Multilingual staff' },
        { label: 'Japanese Café', desc: 'Matcha & Wagashi' },
        { label: 'Cultural Experience', desc: 'Yukata, Tea ceremony, Calligraphy' }
      ],
      company: {
        title: 'Company Profile',
        name: 'OnCarry Co., Ltd.',
        nameEn: '株式会社オンキャリー',
        established: 'Established: July 15, 2025',
        address: '802 Honmachi Meidai Building, 2-5-5 Azuchimachi, Chuo-ku, Osaka 541-0047',
        phone: 'TEL. 06-7777-2759',
        corporateNumber: 'Corporate Number: 7120001278022',
        bank: 'Bank: Sumitomo Mitsui Banking Corporation',
        capital: 'Capital: 5 Million Yen',
        business: 'Vehicle dispatch service, Luggage transportation business, Medical platform business',
        social: {
          title: 'Social Media',
          instagram: 'https://www.instagram.com/on_carry.jp/',
          facebook: 'https://www.facebook.com/61579345594924',
        },
        executives: [
          { role: 'CEO', name: 'Naoto Nurino', nameEn: '塗野 直透' },
          { role: 'Director', name: 'Masakage Hidaka', nameEn: '日髙 将景' },
          { role: 'CLO', name: 'Satoshi Horie', nameEn: '堀江 哲史' },
          { role: 'Advisor', name: 'Takuei Motoda', nameEn: '元田 宅映' },
          { role: 'Advisor', name: 'Masanori Kobayashi', nameEn: '小林 雅紀' }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black py-32 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDM2YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTEsMTQ2LDYwLDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-xl text-orange-400 rounded-full text-sm font-bold">
              <Calendar className="w-4 h-4" />
              <span>{t.badge}</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-orange-400 text-lg font-bold">
                <MapPin className="w-5 h-5" />
                <span>{t.date}</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
                {t.title}
              </h2>
              <p className="text-2xl text-gray-300 font-medium leading-relaxed">
                {t.subtitle}
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 group-hover:bg-white/10 transition-all duration-500">
                    <div className="text-orange-400 font-bold mb-1">{feature.label}</div>
                    <div className="text-gray-400 text-sm">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl opacity-20 blur-3xl"></div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Travel Hub Namba"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-white tracking-tight">{t.company.title}</h3>
            </div>

            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-orange-400 font-bold mb-2 uppercase tracking-wider text-sm">Company Name</div>
                    <div className="text-white text-xl font-bold">{t.company.name}</div>
                    <div className="text-gray-400">{t.company.nameEn}</div>
                  </div>

                  <div>
                    <div className="text-orange-400 font-bold mb-2 uppercase tracking-wider text-sm">Established</div>
                    <div className="text-white font-semibold">{t.company.established}</div>
                  </div>

                  <div>
                    <div className="text-orange-400 font-bold mb-2 uppercase tracking-wider text-sm">Capital</div>
                    <div className="text-white font-semibold">{t.company.capital}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-orange-400 font-bold mb-2 uppercase tracking-wider text-sm">Address</div>
                    <div className="text-gray-300 leading-relaxed">{t.company.address}</div>
                    <div className="text-gray-400 text-sm mt-3 space-y-1">
                      <div>{t.company.phone}</div>
                      <div>{t.company.corporateNumber}</div>
                      <div>{t.company.bank}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-orange-400 font-bold mb-2 uppercase tracking-wider text-sm">Business</div>
                    <div className="text-gray-300 leading-relaxed text-sm">{t.company.business}</div>
                  </div>

                  <div>
                    <div className="text-orange-400 font-bold mb-3 uppercase tracking-wider text-sm">{t.company.social.title}</div>
                    <div className="flex gap-3">
                      <a
                        href={t.company.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <Instagram className="w-6 h-6 text-white" />
                        </div>
                      </a>
                      <a
                        href={t.company.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <Facebook className="w-6 h-6 text-white" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users2 className="w-6 h-6 text-orange-400" />
                  <div className="text-orange-400 font-bold uppercase tracking-wider text-sm">Management Team</div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.company.executives.map((exec, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="text-orange-400 font-bold text-sm mb-2">{exec.role}</div>
                      <div className="text-white font-bold text-lg">{exec.name}</div>
                      <div className="text-gray-400 text-sm">{exec.nameEn}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
