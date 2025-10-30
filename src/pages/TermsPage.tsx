import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function TermsPage() {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: '利用規約',
      lastUpdated: '最終更新日: 2025年11月1日',
      intro: '本利用規約（以下「本規約」）は、株式会社オンキャリー（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。',
      sections: [
        {
          title: '第1条 適用',
          content: '本規約は、本サービスの利用に関する当社とユーザーとの間の権利義務関係を定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。'
        },
        {
          title: '第2条 定義',
          content: '本規約において使用する用語の定義は、以下のとおりとします。\n\n1. 「本サービス」：当社が運営するOnCarryのすべてのサービス\n2. 「ユーザー」：本サービスを利用するすべての個人または法人\n3. 「登録情報」：ユーザーが登録した氏名、メールアドレス等の情報\n4. 「コンテンツ」：本サービス上で提供される文章、画像、動画等の情報'
        },
        {
          title: '第3条 利用登録',
          content: '1. 本サービスの利用を希望する者は、本規約に同意の上、当社所定の方法により利用登録を行うものとします。\n2. 当社は、利用登録の申請者に以下の事由があると判断した場合、登録を承認しないことがあります。\n   - 虚偽の情報を登録した場合\n   - 過去に本規約違反等により登録を取り消されたことがある場合\n   - その他、当社が不適切と判断した場合'
        },
        {
          title: '第4条 サービスの利用',
          content: '1. ユーザーは、本規約に従い、当社の定める方法により本サービスを利用するものとします。\n2. ユーザーは、自己の責任において本サービスを利用するものとします。\n3. ユーザーは、本サービスの利用に際して、以下の行為を行ってはならないものとします。\n   - 法令または公序良俗に違反する行為\n   - 犯罪行為に関連する行為\n   - 当社または第三者の権利を侵害する行為\n   - 本サービスの運営を妨害する行為'
        },
        {
          title: '第5条 料金および支払',
          content: '1. ユーザーは、本サービスの利用料金を当社所定の方法により支払うものとします。\n2. 料金の支払方法は、クレジットカード、現金等、当社が指定する方法とします。\n3. 一度支払われた料金は、原則として返金されません。ただし、返金ポリシーに定める場合を除きます。'
        },
        {
          title: '第6条 予約とキャンセル',
          content: '1. ユーザーは、当社所定の方法により予約を行うものとします。\n2. 予約のキャンセルは、利用開始時刻の2時間前まで無料で行えます。\n3. 2時間前を過ぎた後のキャンセルは、キャンセル料が発生する場合があります。\n4. 詳細は返金ポリシーをご確認ください。'
        },
        {
          title: '第7条 荷物の取り扱い',
          content: '1. 当社は、ユーザーからお預かりした荷物を善良なる管理者の注意をもって保管します。\n2. 以下の物品は、お預かりできません。\n   - 現金、貴金属、有価証券等の貴重品\n   - 危険物、違法物、生鮮食品、生き物\n   - その他、当社が不適切と判断したもの\n3. 万一の破損・紛失等の場合、当社の責めに帰すべき事由がある場合に限り、最大10万円までの範囲で補償します。'
        },
        {
          title: '第8条 禁止事項',
          content: 'ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。\n\n- 虚偽の情報を登録・提供する行為\n- 他のユーザーになりすます行為\n- 当社または第三者の知的財産権を侵害する行為\n- 本サービスのネットワークまたはシステム等に不正にアクセスする行為\n- 本サービスの運営を妨害する行為\n- その他、当社が不適切と判断する行為'
        },
        {
          title: '第9条 免責事項',
          content: '1. 当社は、本サービスに関して、その完全性、正確性、確実性、有用性等について、いかなる保証も行いません。\n2. 天災、事変、その他の不可抗力により本サービスの提供が不可能となった場合、当社は一切の責任を負いません。\n3. ユーザーが本サービスを利用して行った行為およびその結果について、当社は一切の責任を負いません。'
        },
        {
          title: '第10条 サービスの変更・中止',
          content: '当社は、ユーザーへの事前の通知なく、本サービスの内容の全部または一部を変更、追加、廃止することができるものとします。'
        },
        {
          title: '第11条 規約の変更',
          content: '当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、当ウェブサイト上に掲示した時点で効力を生じます。'
        },
        {
          title: '第12条 準拠法および管轄裁判所',
          content: '1. 本規約の解釈にあたっては、日本法を準拠法とします。\n2. 本サービスに関して紛争が生じた場合には、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: November 1, 2025',
      intro: 'These Terms of Service ("Terms") define the conditions for using the services ("Services") provided by OnCarry Inc. ("Company").',
      sections: [
        {
          title: 'Article 1: Application',
          content: 'These Terms are intended to define the rights and obligations between the Company and Users regarding the use of the Services and apply to all relationships between Users and the Company regarding the use of the Services.'
        },
        {
          title: 'Article 2: Definitions',
          content: 'Terms used in these Terms are defined as follows:\n\n1. "Services": All services operated by the Company under OnCarry\n2. "User": Any individual or legal entity using the Services\n3. "Registration Information": Information registered by Users such as name, email address, etc.\n4. "Content": Information such as text, images, videos, etc. provided on the Services'
        },
        {
          title: 'Article 3: User Registration',
          content: '1. Those wishing to use the Services shall agree to these Terms and register using the Company\'s prescribed method.\n2. The Company may not approve registration if the applicant:\n   - Registers false information\n   - Has previously had registration canceled due to Terms violations\n   - Otherwise deemed inappropriate by the Company'
        },
        {
          title: 'Article 4: Use of Services',
          content: '1. Users shall use the Services according to these Terms and the Company\'s prescribed methods.\n2. Users shall use the Services at their own responsibility.\n3. Users shall not engage in the following acts when using the Services:\n   - Acts violating laws or public order and morals\n   - Acts related to criminal activities\n   - Acts infringing on the rights of the Company or third parties\n   - Acts interfering with the operation of the Services'
        },
        {
          title: 'Article 5: Fees and Payment',
          content: '1. Users shall pay service fees using the Company\'s prescribed methods.\n2. Payment methods include credit card, cash, and other methods specified by the Company.\n3. Once paid, fees are generally non-refundable, except as specified in the Refund Policy.'
        },
        {
          title: 'Article 6: Reservations and Cancellations',
          content: '1. Users shall make reservations using the Company\'s prescribed methods.\n2. Cancellations can be made free of charge up to 2 hours before the service start time.\n3. Cancellations after 2 hours may incur cancellation fees.\n4. Please refer to the Refund Policy for details.'
        },
        {
          title: 'Article 7: Luggage Handling',
          content: '1. The Company shall store luggage entrusted by Users with the care of a prudent manager.\n2. The following items cannot be stored:\n   - Valuables such as cash, precious metals, securities\n   - Hazardous materials, illegal items, perishables, living things\n   - Other items deemed inappropriate by the Company\n3. In case of damage or loss attributable to the Company, compensation is limited to a maximum of 100,000 yen.'
        },
        {
          title: 'Article 8: Prohibited Acts',
          content: 'Users shall not engage in the following acts when using the Services:\n\n- Registering or providing false information\n- Impersonating other Users\n- Infringing on intellectual property rights of the Company or third parties\n- Unauthorized access to the Services\' network or systems\n- Interfering with the operation of the Services\n- Other acts deemed inappropriate by the Company'
        },
        {
          title: 'Article 9: Disclaimer',
          content: '1. The Company makes no warranties regarding the completeness, accuracy, reliability, or usefulness of the Services.\n2. The Company assumes no responsibility if the Services become unavailable due to natural disasters, emergencies, or other force majeure events.\n3. The Company assumes no responsibility for acts performed by Users using the Services and their results.'
        },
        {
          title: 'Article 10: Service Changes and Suspension',
          content: 'The Company may change, add, or discontinue all or part of the Services without prior notice to Users.'
        },
        {
          title: 'Article 11: Changes to Terms',
          content: 'The Company may change these Terms as necessary. Revised Terms become effective when posted on the website.'
        },
        {
          title: 'Article 12: Governing Law and Jurisdiction',
          content: '1. These Terms shall be governed by Japanese law.\n2. In case of disputes regarding the Services, the Osaka District Court shall be the exclusive jurisdictional court of first instance.'
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
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-orange-50">{t.lastUpdated}</p>
        </div>
      </div>

      {/* Intro */}
      <div className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed">{t.intro}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
