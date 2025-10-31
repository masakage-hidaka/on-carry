# 🔐 管理画面アクセスガイド

## 完成！

管理画面が完成しました！🎉

---

## 📍 アクセス方法

### 開発環境（ローカル）

```bash
# 管理画面を起動
npm run dev:admin
```

アクセス: http://localhost:5174

### 本番環境（bolt.host）

```
メインサイト: https://on-carry.bolt.host/
管理画面:     https://on-carry.bolt.host/admin/
```

---

## 🔑 最初の管理者アカウント作成

### ステップ1: ユーザー登録

メインサイトで普通にユーザー登録：

1. https://on-carry.bolt.host/signup にアクセス
2. メールアドレスとパスワードで登録
3. 登録したメールアドレスをメモ

### ステップ2: 管理者権限付与

**Supabaseダッシュボード**で実行：

https://supabase.com/dashboard/project/shjmjfjesdpqtbsswrrj/editor

#### 2.1 SQL Editorを開く

左メニュー → "SQL Editor" → "New query"

#### 2.2 以下のSQLを実行

```sql
-- 1. まず自分のuser_idを確認
SELECT id, email FROM auth.users WHERE email = 'あなたのメールアドレス';

-- 2. user_profilesでroleをadminに変更
UPDATE user_profiles
SET role = 'admin'
WHERE id = '上で確認したuser_id';

-- 3. 確認
SELECT * FROM user_profiles WHERE role = 'admin';
```

**重要**: `'あなたのメールアドレス'` を実際に登録したメールに置き換えてください。

---

## 🎯 ログイン方法

1. https://on-carry.bolt.host/admin/ にアクセス
2. 登録したメールアドレスとパスワードでログイン
3. 管理画面ダッシュボードが表示されます！

---

## ✨ 管理画面でできること

### 📊 ダッシュボード

- **統計表示**
  - 総予約数
  - 保留中の予約
  - 完了した予約
  - 総売上

### 📋 予約管理

- **予約一覧表示**
  - 予約番号、サービス種類、顧客情報
  - 金額、予約日時、ステータス、決済状況

- **検索・フィルター**
  - 予約番号、名前、メールで検索
  - ステータスでフィルター
  - サービス種類でフィルター

- **ステータス変更**
  - 保留中 → 確認済み → 進行中 → 完了
  - キャンセル処理

- **リアルタイム更新**

---

## 🔒 セキュリティ

### 実装済み

1. 認証必須
2. 管理者権限チェック
3. 自動ログアウト
4. RLS (Row Level Security)

---

## 💡 よくある質問

### Q: 管理画面にアクセスできない

A: `/admin/` パスにアクセスしているか確認してください

### Q: 「管理者権限がありません」と表示される

A: データベースで権限を確認：
```sql
SELECT id, email, role FROM user_profiles WHERE email = 'あなたのメール';
```

`role` が `'admin'` になっているか確認

---

## 🎉 これで完成！

質問があればいつでもどうぞ！ 🚀
