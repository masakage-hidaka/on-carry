# OnCarry 本番運用実装ガイド

## 📋 目次
1. [データベース設計](#データベース設計)
2. [実装済み機能](#実装済み機能)
3. [必要な追加実装](#必要な追加実装)
4. [あなたがやるべきこと](#あなたがやるべきこと)
5. [運用開始までのチェックリスト](#運用開始までのチェックリスト)

---

## 1. データベース設計

### 既に作成済みのテーブル

#### `users` (Supabase Auth標準)
- ユーザー認証情報
- メール、パスワード
- ユーザーメタデータ

#### `user_profiles`
- ユーザープロフィール拡張情報
- 電話番号、住所、言語設定など

#### `admins`
- 管理者情報
- ロール管理（super_admin, staff, viewer）

### 新規作成が必要なテーブル

#### `bookings` - 予約統合テーブル
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- booking_number (text, unique) - 予約番号
- service_type (text) - 'luggage', 'hire', 'doctor', 'dinner', 'transportation'
- status (text) - 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
- booking_date (timestamp) - 予約日時
- service_date (date) - サービス利用日
- service_time (time) - サービス利用時間
- total_amount (decimal) - 合計金額
- payment_status (text) - 'pending', 'paid', 'refunded'
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- special_requests (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `luggage_bookings` - 荷物預かり詳細
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- pickup_location (text) - ピックアップ場所
- dropoff_location (text) - ドロップオフ場所
- num_bags (integer) - 荷物数
- bag_type (text) - 'small', 'medium', 'large', 'special'
- pickup_time (timestamp)
- dropoff_time (timestamp)
- qr_code (text) - QRコード
- tracking_status (text) - 'received', 'stored', 'in_transit', 'delivered'
- storage_location (text) - 保管場所
```

#### `hire_bookings` - ハイヤー詳細
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- vehicle_type (text) - 'sedan', 'suv', 'van', 'luxury'
- pickup_location (text)
- dropoff_location (text)
- num_passengers (integer)
- rental_type (text) - 'hourly', 'half_day', 'full_day'
- rental_hours (integer)
- driver_name (text)
- driver_phone (text)
- vehicle_number (text)
```

#### `doctor_bookings` - 医療相談詳細
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- consultation_type (text) - 'chat', 'video', 'emergency'
- symptoms (text)
- preferred_language (text)
- consultation_time (timestamp)
- doctor_id (uuid) - 担当医師
- consultation_notes (text)
- prescription (text)
- follow_up_required (boolean)
```

#### `dinner_bookings` - ディナーコンパニオン詳細
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- tour_type (text) - 'food', 'culture', 'anime', 'izakaya', 'street', 'premium'
- num_guests (integer)
- time_slot (text) - 'lunch', 'afternoon', 'evening', 'night'
- dietary_restrictions (text)
- guide_id (uuid) - アサインされたガイド
- meeting_point (text)
- tour_route (text)
```

#### `payments` - 決済情報
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- amount (decimal)
- currency (text) - 'JPY'
- payment_method (text) - 'card', 'cash', 'paypay', 'stripe'
- payment_provider (text) - 'stripe', 'square', 'paypay'
- transaction_id (text) - 決済プロバイダーのトランザクションID
- status (text) - 'pending', 'completed', 'failed', 'refunded'
- paid_at (timestamp)
- refunded_at (timestamp)
```

#### `guides` - ガイド情報（Dinner Companion用）
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- full_name (text)
- email (text)
- phone (text)
- languages (text[]) - ['ja', 'en', 'zh', 'ko']
- specialties (text[]) - ['food', 'culture', 'anime', 'nightlife']
- rating (decimal)
- total_tours (integer)
- availability_status (text) - 'available', 'busy', 'offline'
- profile_image (text)
- bio (text)
```

#### `reviews` - レビュー
```sql
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings)
- user_id (uuid, foreign key → auth.users)
- rating (integer) - 1-5
- comment (text)
- service_quality (integer)
- guide_rating (integer) - ガイド評価（該当サービスのみ）
- created_at (timestamp)
```

#### `notifications` - 通知
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- type (text) - 'booking_confirmed', 'status_update', 'reminder', 'review_request'
- title (text)
- message (text)
- read (boolean)
- sent_at (timestamp)
- email_sent (boolean)
- sms_sent (boolean)
```

---

## 2. 実装済み機能

### ✅ フロントエンド
- [x] 5つの主要サービスページ
- [x] サービスエコシステム図（トップページ）
- [x] 予約フォーム（全サービス）
- [x] 多言語対応（日英）
- [x] レスポンシブデザイン
- [x] ユーザー認証（ログイン・サインアップ）
- [x] 会社情報ページ（9ページ）

### ✅ バックエンド
- [x] Supabase認証設定
- [x] 基本的なデータベーススキーマ
- [x] 管理者ロール設定

---

## 3. 必要な追加実装

### 🔨 データベース
- [ ] 完全な予約管理テーブル
- [ ] 決済情報テーブル
- [ ] レビューシステム
- [ ] 通知システム

### 🔨 予約管理システム
- [ ] リアルタイム予約状況確認
- [ ] 予約変更・キャンセル機能
- [ ] QRコード生成（荷物預かり）
- [ ] 予約確認メール自動送信

### 🔨 決済システム
- [ ] Stripe連携
- [ ] 返金処理
- [ ] 領収書発行

### 🔨 管理画面
- [ ] 予約一覧・管理
- [ ] サービス提供者管理（ドライバー、ガイド、医師）
- [ ] 売上レポート
- [ ] 顧客管理

### 🔨 通知システム
- [ ] メール通知（予約確認、リマインダー）
- [ ] SMS通知（オプション）
- [ ] WhatsApp通知

### 🔨 その他
- [ ] レビュー・評価システム
- [ ] クーポン・割引システム
- [ ] アナリティクス統合

---

## 4. あなたがやるべきこと

### 📝 事前準備

#### 1. Stripeアカウント設定
```bash
1. https://stripe.com でアカウント作成
2. ビジネス情報の登録
3. 銀行口座の接続
4. APIキーの取得（Test & Live）
5. Webhookの設定
```

#### 2. メール送信サービス
```bash
# オプション1: Resend（推奨）
- https://resend.com でアカウント作成
- APIキー取得
- ドメイン認証

# オプション2: SendGrid
- https://sendgrid.com でアカウント作成
- APIキー取得
```

#### 3. SMS通知（オプション）
```bash
# Twilio
- https://twilio.com でアカウント作成
- 電話番号取得
- APIキー取得
```

### 🔑 環境変数設定

`.env`ファイルに以下を追加：

```env
# 既存
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 追加必要
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

RESEND_API_KEY=re_...
FROM_EMAIL=bookings@on-carry.com

TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# 本番環境
VITE_APP_URL=https://on-carry.com
ADMIN_EMAIL=admin@on-carry.com
```

### 📋 ビジネス側の準備

#### 1. サービス提供者の確保
- **ハイヤー**: 提携タクシー会社3-5社
- **ガイド**: 学生ガイド5-10名の採用・研修
- **医師**: オンライン医療相談医師2-3名
- **荷物保管**: 難波の保管場所確保（24時間監視）

#### 2. 保険加入
- 荷物保管保険（最大10万円/個）
- 車両保険（ハイヤー）
- 賠償責任保険

#### 3. 法的対応
- 古物商許可（荷物預かり）
- 旅行業登録（ツアーガイド）
- 個人情報保護方針の整備

#### 4. 料金設定の最終確認
- 各サービスの価格設定
- 繁忙期料金
- キャンセルポリシー

### 🎨 ブランディング

#### ロゴ・ビジュアル
- 正式なロゴデザイン
- ブランドカラーの最終決定
- プロモーション写真の撮影

#### マーケティング素材
- Google My Business登録
- SNSアカウント作成（Instagram、Facebook、Twitter）
- プロモーションビデオ

---

## 5. 運用開始までのチェックリスト

### Week 1: データベース・バックエンド
- [ ] Supabaseマイグレーション実行
- [ ] Row Level Security (RLS) ポリシー設定
- [ ] Stripe連携テスト
- [ ] メール送信テスト

### Week 2: 管理画面・オペレーション
- [ ] 管理画面での予約管理テスト
- [ ] サービス提供者の登録
- [ ] ガイド・ドライバーのアカウント作成
- [ ] オペレーションフロー確認

### Week 3: テスト運用
- [ ] 友人・知人での予約テスト
- [ ] 決済フローのテスト
- [ ] 通知システムのテスト
- [ ] QRコード受け渡しテスト

### Week 4: 最終準備
- [ ] SEO最適化
- [ ] Google Analytics設定
- [ ] エラー監視（Sentry等）
- [ ] バックアップ体制確立

### Week 5: ソフトローンチ
- [ ] 限定公開（一部顧客のみ）
- [ ] フィードバック収集
- [ ] 改善実装

### Week 6: グランドオープン
- [ ] 正式リリース
- [ ] プレスリリース配信
- [ ] SNSキャンペーン開始

---

## 🚀 次のステップ

### 今すぐ実装するもの（優先度: 高）

1. **データベースマイグレーション**
   - 全テーブルの作成
   - RLSポリシーの設定

2. **予約フローの完成**
   - データベースへの保存
   - 予約確認メール送信
   - 管理画面での確認

3. **Stripe決済連携**
   - テスト環境での動作確認
   - 本番環境への移行

4. **管理画面の強化**
   - 予約管理機能
   - ダッシュボード

### 後で実装するもの（優先度: 中）

1. **レビューシステム**
2. **クーポン機能**
3. **ポイントシステム**
4. **アプリ化（PWA）**

### 将来的に検討（優先度: 低）

1. **多言語拡張**（中国語、韓国語）
2. **AI チャットボット**
3. **ブログ・コンテンツマーケティング**

---

## 📞 サポート

実装中に質問があれば、以下を参考に：

- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs
- **React**: https://react.dev

---

**最終更新**: 2025年11月
**バージョン**: 1.0.0
