# OnCarry デプロイメントガイド

## 🎯 完成したもの

### ✅ 実装済み
1. **データベース**: 完全なスキーマ + RLS
2. **予約システム**: `bookingService.ts` + DB連携
3. **Stripe決済**: Edge Function作成済み
4. **メール通知**: Edge Function作成済み
5. **DinnerPage**: 完全な予約フロー実装

---

## 📋 次のステップ（順番に実行）

### Step 1: 環境変数の設定（5分）

`.env`ファイルに以下を追加してください：

```env
# 既存
VITE_SUPABASE_URL=https://shjmjfjesdpqtbsswrrj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 新規追加（あなたのキーに置き換え）
STRIPE_SECRET_KEY=sk_test_あなたのキー
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_あなたのキー

RESEND_API_KEY=re_あなたのキー
FROM_EMAIL=bookings@on-carry.com
```

### Step 2: Edge Functionsのデプロイ（10分）

#### 2.1 Supabase Secretsの設定

Supabaseダッシュボードで設定：
```
https://supabase.com/dashboard/project/shjmjfjesdpqtbsswrrj/settings/functions
```

追加するSecrets:
- `STRIPE_SECRET_KEY`: あなたのStripe Secret Key
- `RESEND_API_KEY`: あなたのResend API Key
- `FROM_EMAIL`: bookings@on-carry.com

#### 2.2 Edge Functionsのデプロイ

**重要**: 以下のコマンドは**ローカルのターミナル**で実行してください（このチャットではありません）

```bash
# Supabase CLIのインストール（まだの場合）
npm install -g supabase

# ログイン
supabase login

# プロジェクトにリンク
supabase link --project-ref shjmjfjesdpqtbsswrrj

# Edge Functionsをデプロイ
supabase functions deploy create-payment-intent
supabase functions deploy send-email
```

### Step 3: Resendのドメイン認証（15分）

1. Resendダッシュボード: https://resend.com/domains
2. "Add Domain"をクリック
3. `on-carry.com`を追加
4. DNSレコードを設定（ドメインレジストラで）
5. 認証完了を待つ（数分〜1時間）

**認証が完了するまで**、テスト用に自分のメールアドレスを使えます：
```env
FROM_EMAIL=あなたのメールアドレス
```

### Step 4: テスト（10分）

#### 4.1 ローカルテスト

```bash
npm run dev
```

1. http://localhost:5173 にアクセス
2. "Dinner Companion"をクリック
3. ツアーを選択
4. 予約フォームを入力
5. "予約を確定"をクリック
6. **エラーが出たら下記を確認**

#### 4.2 トラブルシューティング

**エラー**: "Booking creation failed"
- ✅ `.env`ファイルが正しいか確認
- ✅ Edge Functionsがデプロイされているか確認
- ✅ Supabase Secretsが設定されているか確認

**エラー**: "Email sending failed"
- ✅ Resend API Keyが正しいか確認
- ✅ FROM_EMAILが設定されているか確認
- ✅ （本番）ドメイン認証が完了しているか確認

**予約は成功するがメールが届かない**
- ✅ スパムフォルダを確認
- ✅ Resendダッシュボードでログを確認
- ✅ テスト環境では送信先に制限がある可能性

### Step 5: 本番デプロイ（15分）

#### 5.1 ビルド

```bash
npm run build
```

#### 5.2 Vercel/Netlifyにデプロイ

**Vercel（推奨）**:
```bash
# Vercel CLIインストール
npm install -g vercel

# デプロイ
vercel

# 環境変数を設定（Vercel Dashboard）
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (本番用)
```

**Netlify**:
```bash
# Netlify CLIインストール
npm install -g netlify-cli

# デプロイ
netlify deploy --prod
```

---

## 🔧 次に実装するサービス

### Porter Service（荷物預かり）

`src/pages/BookingPage.tsx`を同様に更新：

```typescript
import { bookingService } from '../lib/bookingService';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const booking = await bookingService.createBooking({
    serviceType: 'porter',
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    bookingData: {
      pickupLocation: formData.pickupHotel,
      dropoffLocation: formData.dropoffHotel,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      numBags: formData.luggageCount,
      bagType: formData.luggageType,
    },
    totalAmount: calculateTotal(),
    scheduledDatetime: formData.pickupDate,
  });

  onNavigate('booking-confirmation', { bookingNumber: booking.booking_number });
};
```

### Hire Service（ハイヤー）

`src/pages/HirePage.tsx`:

```typescript
const booking = await bookingService.createBooking({
  serviceType: 'hire',
  customerName: formData.customerName,
  customerEmail: formData.customerEmail,
  customerPhone: formData.customerPhone,
  bookingData: {
    pickupLocation: formData.pickupLocation,
    destination: formData.destination,
    vehicleType: formData.vehicleType,
    passengerCount: formData.passengerCount,
    rentalType: formData.rentalType,
    pickupDatetime: `${formData.date}T${formData.time}`,
  },
  totalAmount: selectedVehicle.price,
  scheduledDatetime: `${formData.date}T${formData.time}`,
});
```

---

## 🧪 テスト用データ

### テスト用Stripeカード
```
カード番号: 4242 4242 4242 4242
有効期限: 12/34
CVC: 123
郵便番号: 12345
```

### テストメールアドレス
```
success@resend.com  → 送信成功
bounce@resend.com   → バウンスエラー
```

---

## 📊 デプロイ後のチェックリスト

### 機能テスト
- [ ] Dinner Companionの予約が完了する
- [ ] 予約確認メールが届く
- [ ] 予約番号が発行される
- [ ] データベースに正しく保存される

### セキュリティ
- [ ] `.env`ファイルがGitにコミットされていない
- [ ] 本番用のStripe Keyを使用（`sk_live_...`）
- [ ] HTTPS接続（Vercel/Netlifyは自動）

### パフォーマンス
- [ ] ページ読み込みが3秒以内
- [ ] 画像が最適化されている
- [ ] モバイルで正常に動作

---

## 🚀 次のフェーズ

### Phase 1（今週）
- [x] Dinner Companion予約フロー完成
- [ ] Porter Service予約フロー
- [ ] Hire Service予約フロー
- [ ] Doctor Service予約フロー
- [ ] Transportation予約フロー

### Phase 2（来週）
- [ ] 決済フロー実装（Stripe Checkout）
- [ ] 予約追跡ページ
- [ ] 管理画面強化

### Phase 3（再来週）
- [ ] レビューシステムUI
- [ ] ガイド管理画面
- [ ] 売上レポート

---

## 💡 よくある質問

### Q: Edge Functionがデプロイできない
A: Supabase CLIのバージョンを確認してください：
```bash
supabase --version
# v1.150.0以上が必要
supabase update
```

### Q: メールが送信されない
A:
1. Resend API Keyが正しいか確認
2. Supabase Secretsに`RESEND_API_KEY`が設定されているか確認
3. Resendダッシュボードでログを確認

### Q: 予約は成功するがメールが届かない
A: Edge Functionのログを確認：
```bash
supabase functions logs send-email
```

### Q: Stripe決済が失敗する
A:
1. `STRIPE_SECRET_KEY`が正しいか確認
2. テスト環境ではテストキー（`sk_test_`）を使用
3. 本番環境では本番キー（`sk_live_`）を使用

---

## 📞 サポート

問題が解決しない場合：

1. **Supabaseログを確認**
   ```bash
   supabase functions logs create-payment-intent
   supabase functions logs send-email
   ```

2. **ブラウザのコンソールを確認**
   F12 → Console タブ

3. **データベースを確認**
   Supabaseダッシュボード → Table Editor

---

**🎉 準備完了！あとはデプロイするだけです！**

質問があればいつでもどうぞ！
