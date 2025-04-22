# 匿名掲示板システム

## 概要
このプロジェクトは、ユーザーが匿名で投稿・コメントができる掲示板システムです。

## 主な機能

### 掲示板機能
- カテゴリ別の掲示板作成
- スレッド作成
- スレッドへのレス（コメント）投稿
- 画像投稿機能（任意）
- 検索機能

### ユーザー機能
- 完全匿名での投稿
- 任意のニックネーム設定
- トリップ機能（オプション）

### モデレーション機能
- NGワードフィルター
- 不適切な投稿の自動検出
- 管理者による投稿の削除・編集
- IPアドレスベースの投稿制限

### 技術仕様

#### フロントエンド
- Next.js
- TypeScript
- Tailwind CSS
- SWR（データフェッチング）

#### バックエンド
- Node.js
- Express/Next.js API Routes
- PostgreSQL（データベース）
- Prisma（ORM）

#### インフラ
- Vercel/AWS
- CloudFlare（DDoS対策）
- Redis（キャッシュ）

### データベース設計

```users```
- id: UUID
- ip_address: string
- created_at: timestamp
- last_posted_at: timestamp

```boards```
- id: UUID
- name: string
- description: string
- category: string
- created_at: timestamp

```threads```
- id: UUID
- board_id: UUID (foreign key)
- title: string
- created_at: timestamp
- last_posted_at: timestamp
- post_count: integer

```posts```
- id: UUID
- thread_id: UUID (foreign key)
- content: text
- nickname: string (optional)
- trip: string (optional)
- image_url: string (optional)
- ip_address: string (hashed)
- created_at: timestamp

## セキュリティ対策
- XSS対策
- CSRF対策
- レートリミット
- IPアドレスのハッシュ化
- 画像のウイルススキャン
- 不適切なコンテンツの自動検出

## 運用ガイドライン
- 禁止事項の明確化
- 投稿ルール
- プライバシーポリシー
- 免責事項

## 今後の拡張予定
- API提供
- スマートフォンアプリ対応
- 広告システムの導入
- 通報機能の強化
