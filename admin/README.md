# OnCarry Admin - 管理画面

OnCarryの管理者専用ダッシュボードアプリケーションです。顧客向けアプリとは完全に独立したアプリとして動作します。

## 機能

### 📊 ダッシュボード
- **リアルタイム統計**
  - 総予約数
  - 総売上高
  - ステータス別集計（保留中、確認済、進行中、完了）
  - サービス別内訳（ポーター、ハイヤー、ドクター、ディナー）

### 🔍 高度なフィルタリング
- 予約番号・顧客名・メールアドレスで検索
- サービス種別でフィルタ
- ステータスでフィルタ
- 期間でフィルタ（今日、過去7日間、過去30日間）

### 📝 予約管理
- 全予約の一覧表示
- 予約詳細の確認
- ステータス管理
  - 確認済みにする
  - 進行中にする
  - 完了にする
  - キャンセル
- リアルタイム更新（Supabase Realtime）

### 📤 データエクスポート
- CSV形式でデータをエクスポート
- フィルタ適用後のデータを出力

## 起動方法

### 開発環境
```bash
# 管理画面を起動（ポート: 5174）
npm run dev:admin
```

### ビルド
```bash
# 管理画面のみビルド
npm run build:admin

# 顧客アプリと管理画面の両方をビルド
npm run build:all
```

### プレビュー
```bash
# ビルド後のプレビュー（ポート: 4174）
npm run preview:admin
```

## アクセス

- **開発環境**: http://localhost:5174
- **本番環境**: `/admin/` ルート

## 認証

管理画面へのアクセスにはSupabaseの管理者アカウントが必要です。

### ログイン情報
- メールアドレス: Supabaseに登録された管理者アカウント
- パスワード: 設定されたパスワード

## データベース

顧客向けアプリと同じSupabaseデータベースを共有：

### 主要テーブル
- `unified_bookings` - 全サービスの予約データ
- `transportation_bookings` - ポーターサービス詳細
- `hire_requests` - ハイヤーサービス詳細
- `doctor_appointments` - ドクターサービス詳細
- `dinner_experiences` - ディナーサービス詳細

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **バックエンド**: Supabase
- **アイコン**: Lucide React
- **リアルタイム**: Supabase Realtime

## セキュリティ

- Supabase認証による保護
- Row Level Security (RLS)ポリシー
- 管理者権限の確認

## 構造

```
admin/
├── src/
│   ├── contexts/
│   │   └── AdminAuthContext.tsx    # 管理者認証
│   ├── pages/
│   │   ├── AdminLoginPage.tsx      # ログインページ
│   │   └── AdminDashboard.tsx      # メインダッシュボード
│   ├── lib/
│   │   └── supabase.ts             # Supabase接続
│   ├── App.tsx                      # メインアプリ
│   ├── main.tsx                     # エントリーポイント
│   └── index.css                    # スタイル
├── index.html                       # HTMLテンプレート
└── README.md                        # このファイル
```

## デプロイ

### Vercel / Netlify
```bash
# 管理画面をビルド
npm run build:admin

# dist-admin/ ディレクトリをデプロイ
```

### 環境変数
`.env` ファイルに以下を設定：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## サポート

問題がある場合は、以下を確認してください：

1. Supabaseの認証情報が正しく設定されているか
2. データベースのRLSポリシーが適切に設定されているか
3. 管理者アカウントが作成されているか
