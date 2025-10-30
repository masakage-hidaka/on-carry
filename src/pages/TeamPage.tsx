import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function TeamPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: '私たちのチーム',
      subtitle: '情熱を持って旅行者をサポートする仲間たち',
      leadership: {
        title: '経営陣',
        members: [
          {
            name: '塗野直透',
            nameEn: 'Naoto Nurino',
            role: '代表取締役 CEO',
            bio: '大阪出身。旅行業界で10年以上の経験を持ち、旅行者の課題を解決したいという情熱からOnCarryを設立。「すべての旅行者に快適な旅を」をモットーに、革新的なサービスの提供を目指しています。',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: '日高真影',
            nameEn: 'Masakage Hidaka',
            role: 'アドバイザー',
            bio: '旅行・観光業界のベテラン。豊富な経験と知識で、OnCarryの成長を戦略的にサポート。日本のおもてなし文化を世界に広めることに情熱を注いでいます。',
            image: 'https://images.pexels.com/photos/3771790/pexels-photo-3771790.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ]
      },
      team: {
        title: 'チームメンバー',
        members: [
          {
            name: '田中美咲',
            role: '顧客サービス責任者',
            bio: '5言語を話すマルチリンガル。世界中からのお客様を温かくお迎えします。',
            image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: '山田健太',
            role: 'オペレーション マネージャー',
            bio: '効率的な運営で、スムーズなサービス提供を実現。お客様の時間を大切にします。',
            image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: '李美麗',
            role: 'カスタマーサポート',
            bio: '中国語・英語・日本語対応。いつも笑顔で、お客様の問題を解決します。',
            image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: 'John Smith',
            role: 'テクノロジー担当',
            bio: 'アプリ開発とシステム管理を担当。最新技術で、より便利なサービスを提供。',
            image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ]
      },
      join: {
        title: '私たちと一緒に働きませんか？',
        text: 'OnCarryは、情熱を持って旅行業界に貢献したい仲間を募集しています。',
        cta: '採用情報を見る'
      }
    },
    en: {
      title: 'Our Team',
      subtitle: 'Passionate People Supporting Travelers',
      leadership: {
        title: 'Leadership',
        members: [
          {
            name: 'Naoto Nurino',
            nameEn: 'Naoto Nurino',
            role: 'CEO & Founder',
            bio: 'Born in Osaka with over 10 years of experience in the travel industry. Founded OnCarry with a passion to solve travelers\' challenges. His motto: "Comfortable travel for every traveler," driving innovative service delivery.',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: 'Masakage Hidaka',
            nameEn: 'Masakage Hidaka',
            role: 'Adviser',
            bio: 'Veteran in the travel and tourism industry. Strategically supports OnCarry\'s growth with extensive experience and knowledge. Passionate about spreading Japanese hospitality culture worldwide.',
            image: 'https://images.pexels.com/photos/3771790/pexels-photo-3771790.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ]
      },
      team: {
        title: 'Team Members',
        members: [
          {
            name: 'Misaki Tanaka',
            role: 'Customer Service Manager',
            bio: 'Multilingual speaker of 5 languages. Warmly welcomes customers from around the world.',
            image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: 'Kenta Yamada',
            role: 'Operations Manager',
            bio: 'Ensures efficient operations for smooth service delivery. Values every customer\'s time.',
            image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: 'Meili Li',
            role: 'Customer Support',
            bio: 'Supports in Chinese, English, and Japanese. Always ready with a smile to solve customer issues.',
            image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            name: 'John Smith',
            role: 'Technology Lead',
            bio: 'Handles app development and system management. Delivers more convenient services with latest tech.',
            image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ]
      },
      join: {
        title: 'Want to Join Us?',
        text: 'OnCarry is looking for passionate people who want to contribute to the travel industry.',
        cta: 'View Careers'
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
          <p className="text-xl md:text-2xl text-orange-50">{t.subtitle}</p>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.leadership.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {t.leadership.members.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-700 leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex gap-4">
                    <button className="text-orange-600 hover:text-orange-700">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="text-orange-600 hover:text-orange-700">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.team.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3 text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.join.title}</h2>
          <p className="text-xl text-orange-50 mb-8">{t.join.text}</p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            {t.join.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
