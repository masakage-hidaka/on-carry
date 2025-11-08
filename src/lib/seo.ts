export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const updateSEO = (config: SEOConfig) => {
  document.title = config.title;

  const updateOrCreateMeta = (name: string, content: string, property = false) => {
    const attr = property ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;

    if (element) {
      element.content = content;
    } else {
      element = document.createElement('meta');
      if (property) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      element.content = content;
      document.head.appendChild(element);
    }
  };

  updateOrCreateMeta('description', config.description);
  if (config.keywords) {
    updateOrCreateMeta('keywords', config.keywords);
  }

  updateOrCreateMeta('og:title', config.title, true);
  updateOrCreateMeta('og:description', config.description, true);
  if (config.ogImage) {
    updateOrCreateMeta('og:image', config.ogImage, true);
  }
  if (config.canonical) {
    updateOrCreateMeta('og:url', config.canonical, true);
  }

  updateOrCreateMeta('twitter:title', config.title);
  updateOrCreateMeta('twitter:description', config.description);
  if (config.ogImage) {
    updateOrCreateMeta('twitter:image', config.ogImage);
  }

  if (config.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (link) {
      link.href = config.canonical;
    } else {
      link = document.createElement('link');
      link.rel = 'canonical';
      link.href = config.canonical;
      document.head.appendChild(link);
    }
  }
};

export const pageSEO: Record<string, SEOConfig> = {
  home: {
    title: 'OnCarry - 旅行者向けポーターサービス | 大阪・なんばの荷物配送',
    description: '大阪・なんばで旅行者向けの荷物配送サービスOnCarry。ホテル・空港への荷物運搬、観光案内、トラベルドクターなど、旅の不便を解消する総合トラベルサポートサービス。2025年12月Travel Hub Namba OPEN！',
    keywords: 'OnCarry,オンキャリー,荷物配送,ポーターサービス,大阪,なんば,旅行,観光,手ぶら観光,トラベルサポート,Travel Hub Namba',
    canonical: 'https://oncarry.jp/',
  },
  transportation: {
    title: 'Transportation - 荷物配送サービス | OnCarry',
    description: 'ホテルから空港、観光地まで。OnCarryの荷物配送サービスで手ぶら観光を実現。リアルタイム追跡、保険付きで安心・安全な荷物運搬をご提供します。',
    keywords: '荷物配送,ポーターサービス,手ぶら観光,ホテル配送,空港配送,大阪,なんば',
    canonical: 'https://oncarry.jp/transportation',
  },
  dinner: {
    title: 'Dinner - ディナー予約サービス | OnCarry',
    description: '大阪の厳選レストランをOnCarryが予約。多言語対応で安心。旅行者向けの特別なダイニング体験をご提供します。',
    keywords: 'ディナー予約,レストラン予約,大阪グルメ,多言語対応,旅行者向け',
    canonical: 'https://oncarry.jp/dinner',
  },
  doctor: {
    title: 'Travel Doctor - オンライン医療相談 | OnCarry',
    description: '旅行中の体調不良も安心。多言語対応のオンライン医療相談サービス。ビデオ通話、チャット、電話で24時間以内に医師に相談できます。',
    keywords: 'トラベルドクター,オンライン医療相談,多言語医療,旅行医療,テレメディシン',
    canonical: 'https://oncarry.jp/doctor',
  },
  about: {
    title: 'About - 会社概要 | OnCarry',
    description: '株式会社オンキャリーの会社概要。大阪・なんばを拠点に、旅行者向けの総合トラベルサポートサービスを提供しています。',
    keywords: 'OnCarry,会社概要,企業情報,株式会社オンキャリー',
    canonical: 'https://oncarry.jp/about',
  },
  team: {
    title: 'Team - チーム紹介 | OnCarry',
    description: 'OnCarryのチームメンバーをご紹介。経験豊富なメンバーが、旅行者の皆様に最高のサービスをお届けします。',
    keywords: 'チーム,メンバー,会社紹介',
    canonical: 'https://oncarry.jp/team',
  },
  careers: {
    title: 'Careers - 採用情報 | OnCarry',
    description: 'OnCarryで一緒に働きませんか？旅行業界を革新する仲間を募集中。採用情報はこちら。',
    keywords: '採用,求人,キャリア,旅行業界,スタートアップ',
    canonical: 'https://oncarry.jp/careers',
  },
  partner: {
    title: 'Partner - パートナー募集 | OnCarry',
    description: 'OnCarryのパートナーとして一緒にビジネスを成長させませんか？ホテル、レストラン、観光施設との提携を募集しています。',
    keywords: 'パートナー募集,提携,協業,ビジネスパートナー',
    canonical: 'https://oncarry.jp/partner',
  },
  press: {
    title: 'Press - プレスリリース | OnCarry',
    description: 'OnCarryのプレスリリース、メディア掲載情報をご覧いただけます。',
    keywords: 'プレスリリース,メディア,ニュース,お知らせ',
    canonical: 'https://oncarry.jp/press',
  },
};
