# OnCarry 実装ステップバイステップガイド

## 🎯 目標
このガイドに従って、OnCarryを本番運用可能な状態にします。

---

## ✅ 完了済み

### データベース
- [x] 予約管理テーブル（unified_bookings）
- [x] サービス別詳細テーブル（luggage, hire, doctor, dinner）
- [x] 決済テーブル（payments）
- [x] レビューテーブル（reviews）
- [x] 通知テーブル（notifications）
- [x] ガイド管理テーブル（guides, guide_availability）
- [x] Row Level Security (RLS) ポリシー

### フロントエンド
- [x] 5つのサービスページ
- [x] サービスエコシステム図
- [x] 多言語対応（日英）
- [x] レスポンシブデザイン
- [x] ユーザー認証
- [x] 会社情報ページ9ページ

---

## 📝 次に実装するもの

### Phase 1: 予約システムの完成（1週間）

#### 1. 予約フローの実装

**ファイル作成**: `src/lib/bookingService.ts`

```typescript
import { supabase } from './supabase';

interface CreateBookingParams {
  serviceType: 'porter' | 'hire' | 'doctor' | 'dinner' | 'airport';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingData: any;
  totalAmount: number;
  scheduledDatetime?: string;
  specialRequests?: string;
}

export const bookingService = {
  // 予約作成
  async createBooking(params: CreateBookingParams) {
    // 1. booking_numberを生成
    const bookingNumber = `${params.serviceType.toUpperCase()}${Date.now().toString().slice(-8)}`;

    // 2. unified_bookingsに挿入
    const { data: booking, error } = await supabase
      .from('unified_bookings')
      .insert({
        booking_number: bookingNumber,
        service_type: params.serviceType,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        booking_data: params.bookingData,
        total_amount: params.totalAmount,
        scheduled_datetime: params.scheduledDatetime,
        special_requests: params.specialRequests,
        booking_status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    // 3. サービス別詳細テーブルに挿入（例: dinner_experiences）
    if (params.serviceType === 'dinner') {
      await this.createDinnerBooking(booking.id, params.bookingData);
    }

    // 4. 通知を作成
    await this.createBookingNotification(booking.id, params.customerEmail);

    return booking;
  },

  // Dinner予約詳細作成
  async createDinnerBooking(bookingId: string, data: any) {
    const { error } = await supabase
      .from('dinner_experiences')
      .insert({
        booking_id: bookingId,
        experience_type: data.tourType,
        group_size: data.numGuests,
        dietary_restrictions: data.dietaryRestrictions,
        scheduled_datetime: data.scheduledDatetime,
        pickup_location: data.meetingPoint
      });

    if (error) throw error;
  },

  // 通知作成
  async createBookingNotification(bookingId: string, customerEmail: string) {
    const { error } = await supabase.rpc('create_notification', {
      p_user_id: null, // ゲスト予約の場合はnull
      p_booking_id: bookingId,
      p_type: 'booking_confirmed',
      p_title: 'Booking Confirmed',
      p_message: 'Your booking has been confirmed. Check your email for details.'
    });

    if (error) console.error('Notification error:', error);
  },

  // 予約取得
  async getBooking(bookingNumber: string) {
    const { data, error } = await supabase
      .from('unified_bookings')
      .select('*')
      .eq('booking_number', bookingNumber)
      .single();

    if (error) throw error;
    return data;
  },

  // 予約ステータス更新
  async updateBookingStatus(bookingId: string, status: string) {
    const { error } = await supabase
      .from('unified_bookings')
      .update({ booking_status: status, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (error) throw error;
  }
};
```

#### 2. DinnerPageの予約フローを完成させる

**修正ファイル**: `src/pages/DinnerPage.tsx`

`handleSubmit`関数を以下に変更：

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const booking = await bookingService.createBooking({
      serviceType: 'dinner',
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      bookingData: {
        tourType: selectedTour.id,
        numGuests: formData.numGuests,
        timeSlot: formData.timeSlot,
        dietaryRestrictions: formData.dietaryRestrictions,
        specialRequests: formData.specialRequests,
        scheduledDatetime: `${formData.date} ${formData.timeSlot}`,
        meetingPoint: 'Travel Hub Namba'
      },
      totalAmount: selectedTour.pricePerPerson * formData.numGuests,
      scheduledDatetime: `${formData.date} 12:00:00`,
      specialRequests: formData.specialRequests
    });

    onNavigate('booking-confirmation', { bookingNumber: booking.booking_number });
  } catch (error) {
    console.error('Booking failed:', error);
    alert('予約に失敗しました。もう一度お試しください。');
  }
};
```

#### 3. 他のサービスページも同様に実装

- `src/pages/BookingPage.tsx` (Porter Service)
- `src/pages/HirePage.tsx` (Hire Service)
- `src/pages/DoctorPage.tsx` (Doctor Service)

---

### Phase 2: 決済システム (Stripe連携) （3日間）

#### 1. Stripe設定

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

#### 2. Stripe Edge Functionの作成

**ファイル**: `supabase/functions/create-payment-intent/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'npm:stripe@14.10.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = 'jpy', bookingId } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { bookingId },
    })

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

デプロイ:
```bash
# このコマンドは実行しないでください（自動で行われます）
# supabase functions deploy create-payment-intent
```

#### 3. 決済コンポーネントの作成

**ファイル**: `src/components/PaymentForm.tsx`

```typescript
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentFormProps {
  amount: number;
  bookingId: string;
  onSuccess: () => void;
}

function CheckoutForm({ amount, bookingId, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation?bookingId=${bookingId}`,
      },
    });

    if (error) {
      setError(error.message || 'An error occurred');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
      >
        {isProcessing ? '処理中...' : `¥${amount.toLocaleString()} 支払う`}
      </button>
    </form>
  );
}

export function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState('');

  // Payment Intent作成
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(props.amount),
        bookingId: props.bookingId,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [props.amount, props.bookingId]);

  if (!clientSecret) {
    return <div>読み込み中...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
```

---

### Phase 3: メール通知システム（2日間）

#### 1. Resend Edge Function

**ファイル**: `supabase/functions/send-email/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OnCarry <bookings@on-carry.com>',
        to: [to],
        subject,
        html,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

#### 2. メールテンプレート

**ファイル**: `src/lib/emailTemplates.ts`

```typescript
export const bookingConfirmationEmail = (booking: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>予約確認 - OnCarry</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">OnCarry</h1>
    <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">ご予約ありがとうございます</p>
  </div>

  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #111827; margin-top: 0;">予約詳細</h2>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">予約番号</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${booking.booking_number}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">サービス</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.service_type}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">お名前</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.customer_name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">金額</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #f97316;">¥${booking.total_amount.toLocaleString()}</td>
      </tr>
    </table>

    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e;"><strong>重要:</strong> 予約番号は当日必要になります。このメールを保存してください。</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://on-carry.com/track?booking=${booking.booking_number}"
         style="display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
        予約を追跡
      </a>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
      ご不明な点がございましたら、<a href="mailto:support@on-carry.com" style="color: #f97316;">support@on-carry.com</a>までお問い合わせください。
    </p>
  </div>
</body>
</html>
`;
```

---

### Phase 4: 管理画面の強化（3日間）

管理画面に以下の機能を追加：

1. **予約一覧・検索**
2. **予約詳細・ステータス変更**
3. **ガイド管理**
4. **売上レポート**
5. **顧客管理**

これらは既に`admin/`フォルダに基礎があるので、拡張するだけです。

---

## 🚀 今すぐやるべきこと（あなたの作業）

### 1. Stripeアカウント設定（30分）
1. https://stripe.com でアカウント作成
2. APIキーを取得（Test & Live）
3. `.env`に追加：
```
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 2. Resendアカウント設定（15分）
1. https://resend.com でアカウント作成
2. APIキーを取得
3. `.env`に追加：
```
RESEND_API_KEY=re_...
```

### 3. ドメイン設定（1時間）
1. ドメイン購入（例: on-carry.com）
2. Supabaseプロジェクトのカスタムドメイン設定
3. メール送信用のドメイン認証（Resend）

### 4. ビジネス準備（進行中）
- [ ] ガイド募集・採用
- [ ] ハイヤー会社との提携交渉
- [ ] 医師の確保
- [ ] 保管場所の契約
- [ ] 保険加入

---

## 📊 進捗チェックリスト

### 技術面
- [x] データベース設計完了
- [x] フロントエンド完成
- [ ] 予約フロー実装（50%）
- [ ] 決済システム実装（0%）
- [ ] メール通知実装（0%）
- [ ] 管理画面強化（30%）

### ビジネス面
- [ ] Stripe本番アカウント
- [ ] ドメイン取得
- [ ] メール設定
- [ ] サービス提供者確保
- [ ] 保険加入
- [ ] 法的対応

---

## 💡 次回のセッションで実装すること

1. `bookingService.ts`の完全実装
2. すべてのサービスページの予約フロー接続
3. Stripe決済コンポーネントの統合
4. メール通知の実装

**質問があれば、いつでも聞いてください！**
