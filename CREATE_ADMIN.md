# 管理者アカウントの作成方法

## 方法1: Supabaseダッシュボードで作成（推奨）

1. Supabaseダッシュボードにアクセス: https://shjmjfjesdpqtbsswrrj.supabase.co
2. Authentication → Users → Add User
3. メールアドレスとパスワードを設定
4. ユーザー作成後、SQL Editorで以下を実行：

```sql
SELECT set_user_as_admin('your-email@example.com');
```

## 方法2: 自動セットアップ（開発用）

開発環境用のテストアカウントを作成：

**メールアドレス**: admin@oncarry.com
**パスワード**: Admin123!

以下のSQLを実行してテストアカウントを作成します：

```sql
-- Note: This requires Supabase service role key
-- Run this in Supabase SQL Editor as admin
```

## 作成後の確認

管理者ユーザーの一覧を確認：

```sql
SELECT * FROM get_admin_users();
```

## ログイン

https://on-carry.bolt.host/admin/ にアクセスして、作成したメールアドレスとパスワードでログインしてください。
