import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function TravelHubSection() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'Travel Hub',
      subtitle: '旅のサポートステーション',
      description: '大阪・難波に位置するTravel Hubは、旅行者の皆様に心地よい空間とサポートサービスを提供しています。日本の伝統的な温もりと現代的な機能性が調和した、木の温もりあふれる空間でお待ちしております。',
      services: {
        title: 'サービス内容',
        items: [
          '荷物の一時預かり・保管サービス',
          '観光案内・コンシェルジュサービス',
          '各種予約サポート',
          '休憩スペース'
        ]
      },
      location: {
        title: '場所',
        address: '〒556-0011 大阪市浪速区難波中2丁目7番15号 南廣ビル 1階',
        access: [
          '南海なんば駅から徒歩4分',
          '大阪メトロなんば駅から徒歩9分'
        ]
      },
      space: '約73.26㎡（22.2坪）',
      contact: {
        title: 'お問い合わせ',
        cta: 'Travel Hubを訪れる'
      }
    },
    en: {
      title: 'Travel Hub',
      subtitle: 'Your Travel Support Station',
      description: 'Located in Namba, Osaka, our Travel Hub offers travelers a comfortable space and comprehensive support services. Experience the perfect harmony of traditional Japanese warmth and modern functionality in our wood-accented sanctuary.',
      services: {
        title: 'Services',
        items: [
          'Luggage storage and safekeeping',
          'Tourist information & concierge',
          'Booking assistance',
          'Rest area'
        ]
      },
      location: {
        title: 'Location',
        address: 'Nanko Building 1F, 2-7-15 Namba-naka, Naniwa-ku, Osaka City, 556-0011',
        access: [
          '4 minutes walk from Nankai Namba Station',
          '9 minutes walk from Osaka Metro Namba Station'
        ]
      },
      space: 'Approx. 73.26㎡ (22.2 tsubo)',
      contact: {
        title: 'Contact',
        cta: 'Visit Our Travel Hub'
      }
    }
  };

  const t = content[language];

  return (
    <section className="bg-gradient-to-b from-amber-50 to-amber-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-amber-800 font-medium">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-amber-200">
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Japanese interior"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t.description}
            </p>
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="text-sm text-gray-600">
                <strong className="text-amber-900">{language === 'ja' ? 'スペース' : 'Space'}:</strong> {t.space}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-amber-500 rounded"></div>
                {t.services.title}
              </h3>
              <ul className="space-y-3">
                {t.services.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-amber-600" />
                {t.location.title}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t.location.address}</span>
                </p>
                <div className="pl-7 space-y-1">
                  {t.location.access.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {t.contact.title}
              </h3>
              <button className="w-full bg-white text-amber-600 font-bold py-3 px-6 rounded-lg hover:bg-amber-50 transition-colors shadow-lg">
                {t.contact.cta}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-amber-200">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Travel Hub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.4806!2d135.49983!3d34.66195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM5JzQzLjAiTiAxMzXCsDI5JzU5LjQiRQ!5e0!3m2!1sen!2sjp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
