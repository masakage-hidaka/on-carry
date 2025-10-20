export type Language = 'en' | 'ja' | 'zh' | 'ko';

export const translations = {
  en: {
    app: {
      name: 'OnCarry Travel Porter',
      tagline: 'Carrying memories and gratitude from person to person'
    },
    nav: {
      home: 'Home',
      track: 'Track',
      book: 'Book Now',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard'
    },
    home: {
      hero: 'Seamless Luggage Transportation Between Hotels',
      description: 'QR code-based luggage delivery service connecting travelers and hotels across Osaka and Kyoto',
      scanQR: 'Scan QR Code',
      howItWorks: 'How It Works',
      step1: 'Scan QR Code at Your Hotel',
      step1Desc: 'Simply scan the OnCarry QR code displayed at your hotel reception',
      step2: 'Book Your Transfer',
      step2Desc: 'Select your destination hotel and pickup date',
      step3: 'Track Your Luggage',
      step3Desc: 'Real-time tracking from pickup to delivery'
    },
    booking: {
      title: 'Create Booking',
      customerInfo: 'Customer Information',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address (Optional)',
      pickupDetails: 'Pickup Details',
      pickupHotel: 'Pickup Hotel',
      pickupDate: 'Pickup Date',
      deliveryDetails: 'Delivery Details',
      deliveryHotel: 'Destination Hotel',
      luggageInfo: 'Luggage Information',
      luggageType: 'Luggage Type',
      standard: 'Standard',
      large: 'Large',
      luggageCount: 'Number of Pieces',
      specialNotes: 'Special Instructions (Optional)',
      totalAmount: 'Total Amount',
      submit: 'Proceed to Payment',
      success: 'Booking Created Successfully!',
      bookingNumber: 'Booking Number',
      errors: {
        required: 'This field is required',
        invalidPhone: 'Invalid phone number format',
        invalidEmail: 'Invalid email address',
        invalidDate: 'Please select a valid date',
        sameHotel: 'Pickup and delivery hotels must be different'
      }
    },
    tracking: {
      title: 'Track Your Luggage',
      enterBooking: 'Enter Booking Number',
      track: 'Track',
      status: 'Current Status',
      location: 'Current Location',
      timeline: 'Tracking Timeline',
      statuses: {
        pending: 'Booking Confirmed',
        assigned: 'Driver Assigned',
        picked_up: 'Picked Up',
        in_transit: 'In Transit',
        delivered: 'Delivered'
      }
    },
    payment: {
      title: 'Payment',
      method: 'Payment Method',
      card: 'Credit/Debit Card',
      processing: 'Processing Payment...',
      success: 'Payment Successful',
      failed: 'Payment Failed'
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      loginHere: 'Login here',
      signupHere: 'Sign up here'
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      cancel: 'Cancel',
      save: 'Save',
      back: 'Back',
      next: 'Next',
      select: 'Select',
      search: 'Search'
    }
  },
  ja: {
    app: {
      name: 'OnCarry トラベルポーター',
      tagline: '一人一人の思い出と恩を運んでいく'
    },
    nav: {
      home: 'ホーム',
      track: '追跡',
      book: '今すぐ予約',
      login: 'ログイン',
      signup: '新規登録',
      logout: 'ログアウト',
      dashboard: 'ダッシュボード'
    },
    home: {
      hero: 'ホテル間のシームレスな荷物配送',
      description: '大阪・京都のホテルと旅行者をつなぐQRコードベースの荷物配送サービス',
      scanQR: 'QRコードをスキャン',
      howItWorks: '使い方',
      step1: 'ホテルでQRコードをスキャン',
      step1Desc: 'ホテルのフロントに掲示されているOnCarryのQRコードをスキャンしてください',
      step2: '配送を予約',
      step2Desc: '目的地のホテルと集荷日を選択',
      step3: '荷物を追跡',
      step3Desc: '集荷から配達までリアルタイムで追跡'
    },
    booking: {
      title: '予約作成',
      customerInfo: 'お客様情報',
      name: '氏名',
      phone: '電話番号',
      email: 'メールアドレス（任意）',
      pickupDetails: '集荷情報',
      pickupHotel: '集荷ホテル',
      pickupDate: '集荷日',
      deliveryDetails: '配送情報',
      deliveryHotel: '配送先ホテル',
      luggageInfo: '荷物情報',
      luggageType: '荷物タイプ',
      standard: '標準',
      large: '大型',
      luggageCount: '個数',
      specialNotes: '特記事項（任意）',
      totalAmount: '合計金額',
      submit: '支払いへ進む',
      success: '予約が正常に作成されました！',
      bookingNumber: '予約番号',
      errors: {
        required: 'この項目は必須です',
        invalidPhone: '電話番号の形式が無効です',
        invalidEmail: 'メールアドレスの形式が無効です',
        invalidDate: '有効な日付を選択してください',
        sameHotel: '集荷と配送のホテルは異なる必要があります'
      }
    },
    tracking: {
      title: '荷物を追跡',
      enterBooking: '予約番号を入力',
      track: '追跡',
      status: '現在のステータス',
      location: '現在地',
      timeline: '追跡タイムライン',
      statuses: {
        pending: '予約確認済み',
        assigned: 'ドライバー割当済み',
        picked_up: '集荷完了',
        in_transit: '配送中',
        delivered: '配達完了'
      }
    },
    payment: {
      title: '支払い',
      method: '支払い方法',
      card: 'クレジット/デビットカード',
      processing: '支払い処理中...',
      success: '支払い成功',
      failed: '支払い失敗'
    },
    auth: {
      login: 'ログイン',
      signup: '新規登録',
      email: 'メールアドレス',
      password: 'パスワード',
      confirmPassword: 'パスワード確認',
      fullName: '氏名',
      phone: '電話番号',
      dontHaveAccount: 'アカウントをお持ちでないですか？',
      alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
      loginHere: 'こちらからログイン',
      signupHere: 'こちらから登録'
    },
    common: {
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      retry: '再試行',
      cancel: 'キャンセル',
      save: '保存',
      back: '戻る',
      next: '次へ',
      select: '選択',
      search: '検索'
    }
  },
  zh: {
    app: {
      name: 'OnCarry 旅行搬运工',
      tagline: '传递每个人的回忆与感恩'
    },
    nav: {
      home: '首页',
      track: '追踪',
      book: '立即预订',
      login: '登录',
      signup: '注册',
      logout: '退出',
      dashboard: '仪表板'
    },
    home: {
      hero: '酒店间无缝行李运输',
      description: '连接大阪和京都旅客与酒店的二维码行李配送服务',
      scanQR: '扫描二维码',
      howItWorks: '如何使用',
      step1: '在酒店扫描二维码',
      step1Desc: '扫描酒店前台显示的OnCarry二维码',
      step2: '预订配送',
      step2Desc: '选择目的地酒店和取件日期',
      step3: '追踪行李',
      step3Desc: '从取件到送达的实时追踪'
    },
    booking: {
      title: '创建预订',
      customerInfo: '客户信息',
      name: '姓名',
      phone: '电话号码',
      email: '电子邮箱（可选）',
      pickupDetails: '取件详情',
      pickupHotel: '取件酒店',
      pickupDate: '取件日期',
      deliveryDetails: '配送详情',
      deliveryHotel: '目的地酒店',
      luggageInfo: '行李信息',
      luggageType: '行李类型',
      standard: '标准',
      large: '大型',
      luggageCount: '件数',
      specialNotes: '特殊说明（可选）',
      totalAmount: '总金额',
      submit: '前往支付',
      success: '预订创建成功！',
      bookingNumber: '预订号',
      errors: {
        required: '此项为必填项',
        invalidPhone: '电话号码格式无效',
        invalidEmail: '电子邮箱格式无效',
        invalidDate: '请选择有效日期',
        sameHotel: '取件和配送酒店必须不同'
      }
    },
    tracking: {
      title: '追踪行李',
      enterBooking: '输入预订号',
      track: '追踪',
      status: '当前状态',
      location: '当前位置',
      timeline: '追踪时间线',
      statuses: {
        pending: '预订已确认',
        assigned: '司机已分配',
        picked_up: '已取件',
        in_transit: '运输中',
        delivered: '已送达'
      }
    },
    payment: {
      title: '支付',
      method: '支付方式',
      card: '信用卡/借记卡',
      processing: '处理支付中...',
      success: '支付成功',
      failed: '支付失败'
    },
    auth: {
      login: '登录',
      signup: '注册',
      email: '电子邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      fullName: '姓名',
      phone: '电话号码',
      dontHaveAccount: '还没有账户？',
      alreadyHaveAccount: '已有账户？',
      loginHere: '在此登录',
      signupHere: '在此注册'
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      retry: '重试',
      cancel: '取消',
      save: '保存',
      back: '返回',
      next: '下一步',
      select: '选择',
      search: '搜索'
    }
  },
  ko: {
    app: {
      name: 'OnCarry 트래블 포터',
      tagline: '한 사람 한 사람의 추억과 감사를 전달합니다'
    },
    nav: {
      home: '홈',
      track: '추적',
      book: '지금 예약',
      login: '로그인',
      signup: '가입하기',
      logout: '로그아웃',
      dashboard: '대시보드'
    },
    home: {
      hero: '호텔 간 원활한 수하물 운송',
      description: '오사카와 교토의 여행자와 호텔을 연결하는 QR 코드 기반 수하물 배송 서비스',
      scanQR: 'QR 코드 스캔',
      howItWorks: '사용 방법',
      step1: '호텔에서 QR 코드 스캔',
      step1Desc: '호텔 프론트에 표시된 OnCarry QR 코드를 스캔하세요',
      step2: '배송 예약',
      step2Desc: '목적지 호텔과 픽업 날짜 선택',
      step3: '수하물 추적',
      step3Desc: '픽업부터 배송까지 실시간 추적'
    },
    booking: {
      title: '예약 생성',
      customerInfo: '고객 정보',
      name: '성명',
      phone: '전화번호',
      email: '이메일 주소 (선택사항)',
      pickupDetails: '픽업 정보',
      pickupHotel: '픽업 호텔',
      pickupDate: '픽업 날짜',
      deliveryDetails: '배송 정보',
      deliveryHotel: '목적지 호텔',
      luggageInfo: '수하물 정보',
      luggageType: '수하물 유형',
      standard: '표준',
      large: '대형',
      luggageCount: '개수',
      specialNotes: '특별 지시사항 (선택사항)',
      totalAmount: '총액',
      submit: '결제 진행',
      success: '예약이 성공적으로 생성되었습니다!',
      bookingNumber: '예약 번호',
      errors: {
        required: '이 항목은 필수입니다',
        invalidPhone: '잘못된 전화번호 형식',
        invalidEmail: '잘못된 이메일 주소 형식',
        invalidDate: '유효한 날짜를 선택하세요',
        sameHotel: '픽업 및 배송 호텔이 달라야 합니다'
      }
    },
    tracking: {
      title: '수하물 추적',
      enterBooking: '예약 번호 입력',
      track: '추적',
      status: '현재 상태',
      location: '현재 위치',
      timeline: '추적 타임라인',
      statuses: {
        pending: '예약 확인됨',
        assigned: '기사 배정됨',
        picked_up: '픽업 완료',
        in_transit: '배송 중',
        delivered: '배송 완료'
      }
    },
    payment: {
      title: '결제',
      method: '결제 방법',
      card: '신용카드/체크카드',
      processing: '결제 처리 중...',
      success: '결제 성공',
      failed: '결제 실패'
    },
    auth: {
      login: '로그인',
      signup: '가입하기',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      fullName: '성명',
      phone: '전화번호',
      dontHaveAccount: '계정이 없으신가요?',
      alreadyHaveAccount: '이미 계정이 있으신가요?',
      loginHere: '여기서 로그인',
      signupHere: '여기서 가입'
    },
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      retry: '다시 시도',
      cancel: '취소',
      save: '저장',
      back: '뒤로',
      next: '다음',
      select: '선택',
      search: '검색'
    }
  }
};

export type TranslationKey = typeof translations.en;
