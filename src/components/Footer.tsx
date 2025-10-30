import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();

  const content = {
    ja: {
      tagline: 'あなたの完全な旅のパートナー in 大阪',
      services: {
        title: 'サービス',
        items: [
          { name: '荷物預かり', route: 'book' },
          { name: 'ハイヤーサービス', route: 'hire' },
          { name: 'トラベルドクター', route: 'doctor' },
          { name: 'ディナーコンパニオン', route: 'dinner' },
          { name: '観光案内', route: 'home' },
          { name: 'チケット予約', route: 'book' }
        ]
      },
      company: {
        title: '会社情報',
        items: [
          { name: 'OnCarryについて', route: 'about' },
          { name: 'チーム紹介', route: 'team' },
          { name: '採用情報', route: 'careers' },
          { name: 'プレス・メディア', route: 'press' },
          { name: 'パートナー募集', route: 'partner' }
        ]
      },
      legal: {
        title: '法的情報',
        items: [
          { name: 'プライバシーポリシー', route: 'privacy' },
          { name: '利用規約', route: 'terms' },
          { name: '返金ポリシー', route: 'refund' },
          { name: 'サイトマップ', route: 'sitemap' }
        ]
      },
      contact: {
        title: 'お問い合わせ',
        address: '南廣ビル 1F, 大阪市浪速区難波中2-7-15',
        phone: '+81-XX-XXXX-XXXX',
        email: 'info@on-carry.com',
        whatsapp: 'WhatsAppで相談'
      },
      languages: '言語',
      corporate: {
        title: '会社詳細',
        legalName: '会社名',
        legalNameValue: '株式会社オンキャリー (OnCarry Inc.)',
        corporateNumber: '法人番号',
        corporateNumberValue: '7120001278022',
        address: '本社所在地',
        addressValue: '〒541-0052 大阪府大阪市中央区安土町2-5-5 本町明大ビル802',
        ceo: '代表取締役',
        ceoValue: '塗野直透 (Naoto Nurino)',
        adviser: 'アドバイザー',
        adviserValue: '日高真影 (Masakage Hidaka)'
      },
      social: 'ソーシャルメディア',
      copyright: '© 2025 OnCarry Inc. All rights reserved.'
    },
    en: {
      tagline: 'Your Complete Travel Companion in Osaka',
      services: {
        title: 'Services',
        items: [
          { name: 'Luggage Storage', route: 'book' },
          { name: 'Travel Hire', route: 'hire' },
          { name: 'Travel Doctor', route: 'doctor' },
          { name: 'Dinner Companion', route: 'dinner' },
          { name: 'Tourist Info', route: 'home' },
          { name: 'Ticket Booking', route: 'book' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About OnCarry', route: 'about' },
          { name: 'Our Team', route: 'team' },
          { name: 'Careers', route: 'careers' },
          { name: 'Press & Media', route: 'press' },
          { name: 'Partner with Us', route: 'partner' }
        ]
      },
      legal: {
        title: 'Legal',
        items: [
          { name: 'Privacy Policy', route: 'privacy' },
          { name: 'Terms of Service', route: 'terms' },
          { name: 'Refund Policy', route: 'refund' },
          { name: 'Sitemap', route: 'sitemap' }
        ]
      },
      contact: {
        title: 'Contact Us',
        address: 'Nanko Building 1F, 2-7-15 Namba-naka, Naniwa-ku, Osaka',
        phone: '+81-XX-XXXX-XXXX',
        email: 'info@on-carry.com',
        whatsapp: 'Chat on WhatsApp'
      },
      languages: 'Languages',
      corporate: {
        title: 'Company Details',
        legalName: 'Corporate Name',
        legalNameValue: '株式会社オンキャリー (OnCarry Inc.)',
        corporateNumber: 'Corporate Number',
        corporateNumberValue: '7120001278022',
        address: 'Head Office',
        addressValue: '〒541-0052 2-5-5 Azuchimachi, Chuo-ku, Osaka, Hommachi Meidai Building 802',
        ceo: 'CEO',
        ceoValue: 'Naoto Nurino (塗野直透)',
        adviser: 'Adviser',
        adviserValue: 'Masakage Hidaka (日高真影)'
      },
      social: 'Follow Us',
      copyright: '© 2025 OnCarry Inc. All rights reserved.'
    }
  };

  const t = content[language];

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
    { code: 'zh', flag: '🇨🇳', name: '简体' },
    { code: 'tw', flag: '🇹🇼', name: '繁體' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.services.title}</h3>
            <ul className="space-y-3">
              {t.services.items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate?.(item.route)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.company.title}</h3>
            <ul className="space-y-3">
              {t.company.items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate?.(item.route)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.legal.title}</h3>
            <ul className="space-y-3">
              {t.legal.items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate?.(item.route)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.contact.title}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href={`tel:${t.contact.phone}`} className="text-sm hover:text-orange-400 transition-colors">
                  {t.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href={`mailto:${t.contact.email}`} className="text-sm hover:text-orange-400 transition-colors">
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href="https://wa.me/447862123343" className="text-sm hover:text-green-400 transition-colors">
                  {t.contact.whatsapp}
                </a>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">{t.languages}</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-white font-bold text-lg mb-6">{t.corporate.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-400 mb-1">{t.corporate.legalName}</p>
              <p className="text-white font-medium">{t.corporate.legalNameValue}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">{t.corporate.corporateNumber}</p>
              <p className="text-white font-medium">{t.corporate.corporateNumberValue}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">{t.corporate.address}</p>
              <p className="text-white font-medium">{t.corporate.addressValue}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">{t.corporate.ceo}</p>
              <p className="text-white font-medium">{t.corporate.ceoValue}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">{t.corporate.adviser}</p>
              <p className="text-white font-medium">{t.corporate.adviserValue}</p>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div>
            <p className="text-white font-semibold mb-3 text-center md:text-left">{t.social}</p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
