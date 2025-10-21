import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en' | 'zh' | 'ko';

interface Translations {
  app: {
    title: string;
    tagline: string;
  };
  nav: {
    home: string;
    book: string;
    track: string;
    login: string;
    signup: string;
    logout: string;
  };
  home: {
    hero: string;
    description: string;
    howItWorks: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
  };
  [key: string]: Record<string, unknown> | { [key: string]: string };
}

const translations: Record<Language, Translations> = {
  ja: {
    app: {
      title: 'OnCarry',
      tagline: '一人一人の思い出と恩を運んでいく'
    },
    nav: {
      home: 'ホーム',
      book: '予約',
      track: '追跡',
      login: 'ログイン',
      signup: '新規登録',
      logout: 'ログアウト'
    },
    home: {
      hero: 'OnCarry - あなたの旅を格上げ',
      description: '荷物配送からハイヤー、医療相談、ディナー体験まで',
      howItWorks: 'サービスの流れ',
      step1: 'サービス選択',
      step1Desc: 'お好みのサービスを選択',
      step2: '予約確認',
      step2Desc: '詳細を入力して予約',
      step3: 'サービス利用',
      step3Desc: '快適な旅行体験'
    }
  },
  en: {
    app: {
      title: 'OnCarry',
      tagline: 'Carrying memories and gratitude from person to person'
    },
    nav: {
      home: 'Home',
      book: 'Book',
      track: 'Track',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout'
    },
    home: {
      hero: 'OnCarry - Your Journey, Elevated',
      description: 'From luggage delivery to car hire, medical consultation, and dining experiences',
      howItWorks: 'How It Works',
      step1: 'Select Service',
      step1Desc: 'Choose your preferred service',
      step2: 'Confirm Booking',
      step2Desc: 'Enter details and book',
      step3: 'Enjoy Service',
      step3Desc: 'Experience seamless travel'
    }
  },
  zh: {
    app: {
      title: 'OnCarry',
      tagline: '传递每个人的回忆与恩情'
    },
    nav: {
      home: '首页',
      book: '预订',
      track: '追踪',
      login: '登录',
      signup: '注册',
      logout: '登出'
    },
    home: {
      hero: 'OnCarry - 提升您的旅程',
      description: '从行李配送到租车、医疗咨询和用餐体验',
      howItWorks: '服务流程',
      step1: '选择服务',
      step1Desc: '选择您喜欢的服务',
      step2: '确认预订',
      step2Desc: '输入详细信息并预订',
      step3: '享受服务',
      step3Desc: '体验无缝旅行'
    }
  },
  ko: {
    app: {
      title: 'OnCarry',
      tagline: '사람에서 사람으로 추억과 은혜를 전달'
    },
    nav: {
      home: '홈',
      book: '예약',
      track: '추적',
      login: '로그인',
      signup: '가입',
      logout: '로그아웃'
    },
    home: {
      hero: 'OnCarry - 여행을 더욱 특별하게',
      description: '수하물 배송부터 렌터카, 의료 상담, 식사 체험까지',
      howItWorks: '이용 방법',
      step1: '서비스 선택',
      step1Desc: '원하는 서비스를 선택하세요',
      step2: '예약 확인',
      step2Desc: '세부 정보를 입력하고 예약하세요',
      step3: '서비스 이용',
      step3Desc: '완벽한 여행 경험'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
