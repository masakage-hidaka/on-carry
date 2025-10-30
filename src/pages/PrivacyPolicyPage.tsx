import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PrivacyPolicyPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日: 2025年11月1日',
      sections: [
        {
          title: '1. 個人情報の定義',
          content: '本プライバシーポリシーにおいて「個人情報」とは、お客様個人を識別できる情報（氏名、メールアドレス、電話番号、住所等）を指します。'
        },
        {
          title: '2. 個人情報の収集',
          content: '当社は、以下の目的で個人情報を収集します：\n\n・サービスの提供およびサポート\n・予約管理および顧客対応\n・サービス改善のための分析\n・マーケティング活動（お客様の同意がある場合のみ）\n\n収集する情報：\n・氏名、メールアドレス、電話番号\n・宿泊施設情報、配送先住所\n・決済情報（クレジットカード情報は暗号化され、安全に保管されます）\n・サービス利用履歴'
        },
        {
          title: '3. 個人情報の利用目的',
          content: '収集した個人情報は、以下の目的で利用されます：\n\n・サービスの提供、運営、維持\n・カスタマーサポートの提供\n・サービスの改善、新サービスの開発\n・お客様との連絡、お知らせの送信\n・不正行為の防止、セキュリティの維持\n・法令遵守および紛争解決'
        },
        {
          title: '4. 個人情報の第三者提供',
          content: '当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません：\n\n・お客様の同意がある場合\n・法令に基づく場合\n・人の生命、身体または財産の保護のために必要な場合\n・サービス提供のために必要な業務委託先（配送業者、決済代行業者等）\n\n※業務委託先には、適切な管理・監督を行います。'
        },
        {
          title: '5. 個人情報の安全管理',
          content: '当社は、個人情報の漏洩、滅失、毀損を防止するため、以下の安全管理措置を講じています：\n\n・SSL/TLS暗号化通信の使用\n・アクセス制限の実施\n・従業員への教育・研修\n・セキュリティシステムの導入\n・定期的なセキュリティ監査'
        },
        {
          title: '6. Cookieの使用',
          content: '当社ウェブサイトでは、より良いサービス提供のためCookieを使用しています。Cookieは、ウェブサイトの利用状況の分析、ユーザー体験の向上に使用されます。\n\nお客様は、ブラウザの設定でCookieを無効化することができますが、一部機能が制限される場合があります。'
        },
        {
          title: '7. お客様の権利',
          content: 'お客様は、ご自身の個人情報について、以下の権利を有します：\n\n・個人情報の開示請求\n・個人情報の訂正・追加・削除\n・個人情報の利用停止・消去\n・第三者提供の停止\n\nこれらの請求は、本ポリシー末尾の連絡先までご連絡ください。'
        },
        {
          title: '8. ポリシーの変更',
          content: '当社は、法令の変更や事業内容の変更に応じて、本プライバシーポリシーを改定することがあります。変更後のポリシーは、当ウェブサイトに掲載した時点で効力を生じます。'
        },
        {
          title: '9. お問い合わせ',
          content: '個人情報の取扱いに関するお問い合わせは、以下までご連絡ください：\n\n株式会社オンキャリー\n個人情報保護管理者: 塗野直透\nメール: privacy@on-carry.com\n住所: 〒541-0052 大阪府大阪市中央区安土町2-5-5 本町明大ビル802'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: November 1, 2025',
      sections: [
        {
          title: '1. Definition of Personal Information',
          content: 'In this Privacy Policy, "Personal Information" refers to information that can identify you as an individual (name, email address, phone number, address, etc.).'
        },
        {
          title: '2. Collection of Personal Information',
          content: 'We collect personal information for the following purposes:\n\n・Service provision and support\n・Booking management and customer service\n・Analysis for service improvement\n・Marketing activities (only with your consent)\n\nInformation collected:\n・Name, email address, phone number\n・Accommodation information, delivery addresses\n・Payment information (credit card information is encrypted and stored securely)\n・Service usage history'
        },
        {
          title: '3. Use of Personal Information',
          content: 'Collected personal information is used for the following purposes:\n\n・Providing, operating, and maintaining services\n・Providing customer support\n・Improving services and developing new services\n・Communicating with customers, sending notifications\n・Preventing fraud, maintaining security\n・Compliance with laws and dispute resolution'
        },
        {
          title: '4. Disclosure to Third Parties',
          content: 'We do not disclose your personal information to third parties except in the following cases:\n\n・With your consent\n・As required by law\n・When necessary to protect life, body, or property\n・Service contractors necessary for service provision (delivery companies, payment processors, etc.)\n\n※We properly manage and supervise our contractors.'
        },
        {
          title: '5. Security of Personal Information',
          content: 'We implement the following security measures to prevent leakage, loss, or damage of personal information:\n\n・Use of SSL/TLS encrypted communication\n・Implementation of access restrictions\n・Employee education and training\n・Introduction of security systems\n・Regular security audits'
        },
        {
          title: '6. Use of Cookies',
          content: 'Our website uses cookies to provide better services. Cookies are used to analyze website usage and improve user experience.\n\nYou can disable cookies in your browser settings, but some features may be limited.'
        },
        {
          title: '7. Your Rights',
          content: 'You have the following rights regarding your personal information:\n\n・Request disclosure of personal information\n・Correction, addition, or deletion of personal information\n・Suspension or deletion of use of personal information\n・Suspension of provision to third parties\n\nFor these requests, please contact us at the address provided at the end of this policy.'
        },
        {
          title: '8. Policy Changes',
          content: 'We may revise this Privacy Policy in response to changes in laws or business operations. The revised policy becomes effective when posted on our website.'
        },
        {
          title: '9. Contact',
          content: 'For inquiries regarding the handling of personal information, please contact:\n\nOnCarry Inc.\nPrivacy Officer: Naoto Nurino\nEmail: privacy@on-carry.com\nAddress: 2-5-5 Azuchimachi, Chuo-ku, Osaka, 541-0052, Japan'
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
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-orange-50">{t.lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {t.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
