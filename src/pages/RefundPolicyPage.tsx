import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function RefundPolicyPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: '返金ポリシー',
      lastUpdated: '最終更新日: 2025年11月1日',
      intro: 'OnCarryでは、お客様に安心してサービスをご利用いただくため、明確な返金ポリシーを設けています。',
      sections: [
        {
          title: '荷物預かりサービス',
          items: [
            {
              subtitle: '利用開始2時間前までのキャンセル',
              content: '100%返金いたします。キャンセル手数料はかかりません。'
            },
            {
              subtitle: '利用開始2時間前〜1時間前のキャンセル',
              content: '50%のキャンセル料が発生します。残り50%を返金いたします。'
            },
            {
              subtitle: '利用開始1時間前以降のキャンセル',
              content: '100%のキャンセル料が発生します。返金は行いません。'
            },
            {
              subtitle: 'サービス提供開始後のキャンセル',
              content: '返金は行いません。'
            }
          ]
        },
        {
          title: 'ハイヤーサービス',
          items: [
            {
              subtitle: '利用開始24時間前までのキャンセル',
              content: '100%返金いたします。'
            },
            {
              subtitle: '利用開始24時間前〜12時間前のキャンセル',
              content: '50%のキャンセル料が発生します。'
            },
            {
              subtitle: '利用開始12時間前以降のキャンセル',
              content: '100%のキャンセル料が発生します。返金は行いません。'
            }
          ]
        },
        {
          title: 'トラベルドクター',
          items: [
            {
              subtitle: '予約時間の3時間前までのキャンセル',
              content: '100%返金いたします。'
            },
            {
              subtitle: '予約時間の3時間前以降のキャンセル',
              content: '返金は行いません。'
            }
          ]
        },
        {
          title: 'ディナーコンパニオン',
          items: [
            {
              subtitle: '予約日の3日前までのキャンセル',
              content: '100%返金いたします。'
            },
            {
              subtitle: '予約日の2日前〜1日前のキャンセル',
              content: '50%のキャンセル料が発生します。'
            },
            {
              subtitle: '予約日当日のキャンセル',
              content: '100%のキャンセル料が発生します。返金は行いません。'
            }
          ]
        },
        {
          title: '当社都合によるキャンセル',
          content: '当社の都合によりサービスを提供できない場合、全額返金いたします。また、お客様にご迷惑をおかけしたことへのお詫びとして、次回ご利用いただける10%割引クーポンを発行いたします。'
        },
        {
          title: '返金方法',
          content: '返金は、お支払いいただいた方法と同じ方法で行います。\n\n・クレジットカード決済：カード会社を通じて返金（5〜10営業日）\n・現金決済：現地で直接返金、または銀行振込\n\n返金処理完了後、メールにてご連絡いたします。'
        },
        {
          title: '不可抗力による中止',
          content: '天災、事変、交通機関の運休等の不可抗力により、お客様がサービスを利用できなくなった場合、状況に応じて返金または振替対応を行います。詳細は個別にご相談ください。'
        },
        {
          title: '返金申請方法',
          content: '返金をご希望の場合は、以下の方法でご連絡ください。\n\n1. マイページの予約履歴から「キャンセル」ボタンをクリック\n2. カスタマーサポート（support@on-carry.com）にメール\n3. WhatsAppでご連絡（+44 7862123343）\n\n※予約番号を必ずお知らせください。'
        },
        {
          title: 'お問い合わせ',
          content: '返金ポリシーに関するご質問は、以下までご連絡ください。\n\nカスタマーサポート\nメール: support@on-carry.com\nWhatsApp: +44 7862123343\n営業時間: 8:00〜21:00（年中無休）'
        }
      ]
    },
    en: {
      title: 'Refund Policy',
      lastUpdated: 'Last Updated: November 1, 2025',
      intro: 'At OnCarry, we have established a clear refund policy to ensure customers can use our services with peace of mind.',
      sections: [
        {
          title: 'Luggage Storage Service',
          items: [
            {
              subtitle: 'Cancellation up to 2 hours before service',
              content: '100% refund. No cancellation fee.'
            },
            {
              subtitle: 'Cancellation 2 hours to 1 hour before service',
              content: '50% cancellation fee applies. 50% refund.'
            },
            {
              subtitle: 'Cancellation within 1 hour of service',
              content: '100% cancellation fee applies. No refund.'
            },
            {
              subtitle: 'Cancellation after service start',
              content: 'No refund.'
            }
          ]
        },
        {
          title: 'Hire Service',
          items: [
            {
              subtitle: 'Cancellation up to 24 hours before service',
              content: '100% refund.'
            },
            {
              subtitle: 'Cancellation 24 to 12 hours before service',
              content: '50% cancellation fee applies.'
            },
            {
              subtitle: 'Cancellation within 12 hours of service',
              content: '100% cancellation fee applies. No refund.'
            }
          ]
        },
        {
          title: 'Travel Doctor',
          items: [
            {
              subtitle: 'Cancellation up to 3 hours before appointment',
              content: '100% refund.'
            },
            {
              subtitle: 'Cancellation within 3 hours of appointment',
              content: 'No refund.'
            }
          ]
        },
        {
          title: 'Dinner Companion',
          items: [
            {
              subtitle: 'Cancellation up to 3 days before reservation',
              content: '100% refund.'
            },
            {
              subtitle: 'Cancellation 2 to 1 day before reservation',
              content: '50% cancellation fee applies.'
            },
            {
              subtitle: 'Cancellation on reservation day',
              content: '100% cancellation fee applies. No refund.'
            }
          ]
        },
        {
          title: 'Cancellation by Company',
          content: 'If we cannot provide services due to Company circumstances, we will provide a full refund. Additionally, we will issue a 10% discount coupon for your next use as an apology for the inconvenience.'
        },
        {
          title: 'Refund Method',
          content: 'Refunds are processed using the same payment method.\n\n・Credit card payment: Refund through card company (5-10 business days)\n・Cash payment: Direct refund on-site or bank transfer\n\nYou will receive an email notification once the refund is processed.'
        },
        {
          title: 'Force Majeure Cancellations',
          content: 'If you cannot use services due to force majeure (natural disasters, transportation disruptions, etc.), we will provide refunds or rescheduling based on the situation. Please contact us for details.'
        },
        {
          title: 'How to Request a Refund',
          content: 'To request a refund, please contact us using one of the following methods:\n\n1. Click the "Cancel" button in your booking history on My Page\n2. Email Customer Support (support@on-carry.com)\n3. Contact via WhatsApp (+44 7862123343)\n\n※Please provide your booking number.'
        },
        {
          title: 'Contact',
          content: 'For questions about our refund policy, please contact:\n\nCustomer Support\nEmail: support@on-carry.com\nWhatsApp: +44 7862123343\nHours: 8:00-21:00 (Open 7 days)'
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
          <RotateCcw className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-orange-50">{t.lastUpdated}</p>
        </div>
      </div>

      {/* Intro */}
      <div className="py-8 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg text-center leading-relaxed">{t.intro}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {t.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                {section.items ? (
                  <div className="space-y-6">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-orange-600 pl-6">
                        <h3 className="font-bold text-gray-900 mb-2">{item.subtitle}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ja' ? 'ご不明な点がございますか？' : 'Have Questions?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'ja'
              ? 'カスタマーサポートが丁寧にお答えいたします。'
              : 'Our customer support team is here to help.'}
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            {language === 'ja' ? 'サポートに連絡' : 'Contact Support'}
          </button>
        </div>
      </div>
    </div>
  );
}
