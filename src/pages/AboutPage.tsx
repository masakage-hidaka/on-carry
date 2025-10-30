import { Target, Heart, Globe, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'OnCarryについて',
      subtitle: '大阪での旅をもっと自由に、もっと快適に',
      mission: {
        title: 'ミッション',
        text: '私たちは、旅行者が荷物の心配なく大阪を自由に楽しめる環境を提供することを使命としています。手ぶらで街を歩き、思い出を作ることに集中できる—それがOnCarryの目指す世界です。'
      },
      vision: {
        title: 'ビジョン',
        text: '日本全国、そして世界中の旅行者にとって「旅の頼れるパートナー」となること。荷物預かりだけでなく、旅行に関するあらゆるサポートを提供する総合旅行ハブを目指しています。'
      },
      values: {
        title: '私たちの価値観',
        items: [
          {
            icon: Heart,
            title: 'おもてなしの心',
            description: '日本の伝統的なおもてなし精神を大切に、すべてのお客様に心のこもったサービスを提供します。'
          },
          {
            icon: Target,
            title: '信頼と安全',
            description: '24時間監視システムと完全保険で、お客様の大切な荷物を守ります。'
          },
          {
            icon: Globe,
            title: '多様性の尊重',
            description: '世界中からのお客様を歓迎し、多言語対応で快適なコミュニケーションを提供します。'
          },
          {
            icon: Award,
            title: '革新的なサービス',
            description: 'テクノロジーを活用し、QRコード予約やリアルタイム追跡など、便利なサービスを追求します。'
          }
        ]
      },
      story: {
        title: '私たちのストーリー',
        text: 'OnCarryは、大阪を訪れる旅行者が抱える「荷物問題」を解決したいという想いから生まれました。創業者である塗野直透は、自身の旅行経験から、コインロッカーの不便さや空港までの荷物運びの大変さを実感。「もっと旅行者に優しい街にしたい」という情熱が、OnCarry設立のきっかけとなりました。\n\n2025年12月、難波の中心地にTravel Hubをオープン。単なる荷物預かり所ではなく、旅行者のための「第二の家」として、様々なサービスを提供する総合施設を実現しました。'
      },
      stats: [
        { number: '15,000+', label: '満足いただいたお客様' },
        { number: '4.9/5', label: 'Google評価' },
        { number: '5言語', label: '対応言語' },
        { number: '8種類', label: 'サービス' }
      ]
    },
    en: {
      title: 'About OnCarry',
      subtitle: 'Making Your Osaka Journey More Free and Comfortable',
      mission: {
        title: 'Our Mission',
        text: 'Our mission is to provide an environment where travelers can freely enjoy Osaka without worrying about their luggage. Walk the streets hands-free and focus on creating memories—that\'s the world OnCarry aims to create.'
      },
      vision: {
        title: 'Our Vision',
        text: 'To become a "reliable travel partner" for travelers across Japan and around the world. We aim to be a comprehensive travel hub providing not only luggage storage but all kinds of travel support.'
      },
      values: {
        title: 'Our Values',
        items: [
          {
            icon: Heart,
            title: 'Hospitality',
            description: 'We cherish the traditional Japanese spirit of hospitality, providing heartfelt service to every customer.'
          },
          {
            icon: Target,
            title: 'Trust & Safety',
            description: 'We protect your precious luggage with 24/7 surveillance systems and full insurance coverage.'
          },
          {
            icon: Globe,
            title: 'Diversity',
            description: 'We welcome customers from around the world, offering multilingual support for comfortable communication.'
          },
          {
            icon: Award,
            title: 'Innovation',
            description: 'We leverage technology to provide convenient services like QR code booking and real-time tracking.'
          }
        ]
      },
      story: {
        title: 'Our Story',
        text: 'OnCarry was born from a desire to solve the "luggage problem" that travelers to Osaka face. Founder Naoto Nurino, from his own travel experiences, realized the inconvenience of coin lockers and the difficulty of carrying luggage to airports. His passion to "make the city more traveler-friendly" became the catalyst for establishing OnCarry.\n\nIn December 2025, we opened our Travel Hub in the heart of Namba. It\'s not just a luggage storage facility, but a comprehensive facility that serves as a "second home" for travelers, offering various services.'
      },
      stats: [
        { number: '15,000+', label: 'Happy Customers' },
        { number: '4.9/5', label: 'Google Rating' },
        { number: '5 Languages', label: 'Support' },
        { number: '8 Services', label: 'Available' }
      ]
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

      {/* Stats */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.mission.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{t.mission.text}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.vision.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{t.vision.text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.values.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.items.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.story.title}</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {t.story.text}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'ja' ? '私たちと一緒に、より良い旅を' : 'Join Us for Better Travels'}
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            {language === 'ja'
              ? 'OnCarryは、あなたの大阪旅行をサポートします。'
              : 'OnCarry supports your Osaka journey.'}
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            {language === 'ja' ? '今すぐ予約' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
