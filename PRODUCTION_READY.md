# OnCarry - 実運用ガイド

## ✅ 本番環境準備完了

このプロジェクトは実運用可能な状態になっています。以下の機能とセキュリティ対策が実装されています。

---

## 🏗️ システム構成

### **2つの独立したアプリケーション**

#### 1. **顧客向けアプリ** (`/src`)
- **ポート**: 5173 (開発)
- **ビルド出力**: `dist/`
- **機能**:
  - ポーターサービス予約
  - ハイヤーサービス予約
  - 空港送迎サービス
  - ドクター予約
  - ディナー体験予約
  - 予約トラッキング
  - ユーザー認証（Supabase Auth）

#### 2. **管理者画面** (`/admin`)
- **ポート**: 5174 (開発)
- **ビルド出力**: `dist-admin/`
- **機能**:
  - リアルタイムダッシュボード
  - 予約管理（全サービス統合）
  - ステータス管理
  - 統計・分析
  - CSVエクスポート
  - 管理者専用認証

---

## 🔒 セキュリティ対策

### **Row Level Security (RLS)**
すべてのテーブルでRLSが有効化されています：

#### **unified_bookings（統合予約テーブル）**
- ✅ 顧客は自分の予約のみ閲覧可能
- ✅ 管理者は全予約を閲覧・更新可能
- ✅ 認証済みユーザーのみ予約作成可能

#### **サービス別テーブル**
- `hire_requests` - ハイヤー予約詳細
- `doctor_appointments` - ドクター予約詳細
- `dinner_experiences` - ディナー体験詳細
- `airport_transfers` - 空港送迎詳細

すべてのテーブルで：
- ✅ 顧客は自分のデータのみアクセス
- ✅ 管理者は全データにアクセス
- ✅ 未認証ユーザーはアクセス不可

### **管理者ロール管理**
```sql
-- 管理者チェック関数
is_admin(user_id) -- user_profilesテーブルのroleカラムで判定
```

管理者は`user_profiles`テーブルで`role = 'admin'`に設定されたユーザーのみ。

---

## 🗄️ データベーススキーマ

### **主要テーブル**

#### 1. `unified_bookings` - 統合予約管理
全サービスの予約を一元管理。以下の情報を含む：
- 予約番号（ユニーク）
- サービスタイプ（porter, hire, airport, doctor, dinner）
- 顧客情報
- 支払情報
- 予約ステータス
- JSONデータ（サービス固有の情報）

#### 2. `user_profiles` - ユーザープロファイル
- ロール管理（customer, hotel_staff, driver, admin）
- 連絡先情報
- 言語設定

#### 3. サービス固有テーブル
- `hire_requests` - ハイヤーサービス
- `doctor_appointments` - ドクターサービス
- `dinner_experiences` - ディナー体験
- `airport_transfers` - 空港送迎
- `transportation_bookings` - ポーターサービス

### **パフォーマンス最適化**
以下のインデックスが設定済み：
- `unified_bookings`: customer_id, booking_status, payment_status, service_type, created_at
- `user_profiles`: role
- 各サービステーブル: booking_id

---

## 🚀 デプロイ方法

### **1. 環境変数の設定**

`.env`ファイルに以下を設定：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **2. ビルド**

```bash
# 顧客アプリのみ
npm run build

# 管理画面のみ
npm run build:admin

# 両方を同時にビルド
npm run build:all
```

### **3. Vercelへのデプロイ**

#### **顧客アプリ**
```bash
cd dist
vercel --prod
```

設定：
- Build Command: `npm run build`
- Output Directory: `dist`
- Domain: `oncarry.com`

#### **管理画面**
```bash
cd dist-admin
vercel --prod
```

設定：
- Build Command: `npm run build:admin`
- Output Directory: `dist-admin`
- Domain: `admin.oncarry.com`

### **4. Netlifyへのデプロイ**

#### **顧客アプリ**
```bash
netlify deploy --prod --dir=dist
```

#### **管理画面**
```bash
netlify deploy --prod --dir=dist-admin
```

---

## 👤 管理者アカウント作成

### **Supabaseダッシュボードから**

1. Supabaseプロジェクトにログイン
2. **Authentication** → **Users** → **Add user**
3. メールアドレスとパスワードを設定

### **管理者ロールの付与**

```sql
-- Supabase SQL Editorで実行
INSERT INTO user_profiles (id, role, full_name)
VALUES
  ('user_uuid_from_auth_users', 'admin', '管理者名')
ON CONFLICT (id)
DO UPDATE SET role = 'admin';
```

または、既存ユーザーを管理者に昇格：

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE id = 'user_uuid';
```

---

## 📊 管理画面の使い方

### **ログイン**
1. `https://admin.oncarry.com` にアクセス
2. 管理者アカウントでログイン

### **ダッシュボード機能**

#### **統計表示**
- 総予約数
- 総売上高
- ステータス別集計
- サービス別内訳

#### **予約管理**
- 全予約の一覧表示
- 検索（予約番号、顧客名、メール）
- フィルタリング（サービス、ステータス、期間）
- 詳細表示
- ステータス更新
  - 確認済み
  - 進行中
  - 完了
  - キャンセル

#### **リアルタイム更新**
- Supabase Realtimeで自動更新
- 新規予約が即座に表示

#### **データエクスポート**
- CSVファイルでダウンロード
- フィルタ適用後のデータを出力

---

## 🧪 動作確認

### **顧客アプリ**
```bash
npm run dev
# http://localhost:5173 にアクセス
```

1. ユーザー登録
2. サービス選択
3. 予約フォーム入力
4. 予約完了
5. トラッキングページで確認

### **管理画面**
```bash
npm run dev:admin
# http://localhost:5174 にアクセス
```

1. 管理者アカウントでログイン
2. ダッシュボードで予約確認
3. ステータス更新テスト
4. CSVエクスポート確認

---

## 🔧 技術スタック

### **フロントエンド**
- React 18 + TypeScript
- Vite（ビルドツール）
- Tailwind CSS
- Lucide React（アイコン）

### **バックエンド**
- Supabase
  - PostgreSQL（データベース）
  - Row Level Security（RLS）
  - Realtime（リアルタイム更新）
  - Authentication（認証）

### **開発ツール**
- ESLint
- TypeScript
- PostCSS
- Autoprefixer

---

## 📝 運用上の注意事項

### **1. データベースバックアップ**
Supabaseで自動バックアップを有効化してください。

### **2. エラーログ監視**
Supabaseダッシュボードでエラーログを定期的に確認してください。

### **3. RLSポリシーの変更**
RLSポリシーを変更する際は、必ずテスト環境で動作確認してください。

### **4. 管理者権限の管理**
管理者ロールは慎重に付与してください。必要最小限のユーザーのみに制限。

### **5. 環境変数の保護**
`.env`ファイルは絶対にGitにコミットしないでください。

---

## 🐛 トラブルシューティング

### **問題: 管理画面にログインできない**
**解決策**:
1. user_profilesテーブルでroleが'admin'か確認
2. Supabase Authでユーザーが登録されているか確認
3. 環境変数が正しく設定されているか確認

### **問題: 予約が表示されない**
**解決策**:
1. RLSポリシーが正しく設定されているか確認
2. customer_idがnullでないか確認
3. Supabaseダッシュボードでデータを直接確認

### **問題: ビルドエラー**
**解決策**:
```bash
# node_modulesを削除して再インストール
rm -rf node_modules
npm install

# キャッシュをクリア
npm run build -- --force
```

---

## 📞 サポート

### **Supabase関連**
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)

### **React関連**
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🎉 完成機能一覧

### **顧客向けアプリ**
- ✅ マルチ言語対応（日本語、英語、中国語、韓国語）
- ✅ ユーザー認証（登録、ログイン、ログアウト）
- ✅ 5つのサービス予約機能
- ✅ 予約トラッキング
- ✅ レスポンシブデザイン

### **管理画面**
- ✅ 管理者認証
- ✅ リアルタイムダッシュボード
- ✅ 予約管理（CRUD）
- ✅ 高度な検索・フィルタリング
- ✅ 統計・分析
- ✅ CSVエクスポート
- ✅ レスポンシブデザイン

### **データベース**
- ✅ 包括的なスキーマ設計
- ✅ Row Level Security（全テーブル）
- ✅ 管理者ロール管理
- ✅ パフォーマンス最適化（インデックス）
- ✅ リアルタイム更新機能

### **セキュリティ**
- ✅ RLSポリシー（全テーブル）
- ✅ 認証必須
- ✅ 管理者権限チェック
- ✅ データ分離（顧客別）

---

## 📦 デプロイチェックリスト

- [ ] 環境変数を本番用に設定
- [ ] Supabaseプロジェクトを本番モードに変更
- [ ] 管理者アカウントを作成
- [ ] RLSポリシーを確認
- [ ] 両アプリをビルド
- [ ] Vercel/Netlifyにデプロイ
- [ ] カスタムドメインを設定
- [ ] SSL証明書を確認
- [ ] 動作確認（エンドツーエンド）
- [ ] バックアップ設定を確認
- [ ] エラー監視を設定

---

**これで、OnCarryは実運用可能です！🚀**
