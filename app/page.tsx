import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">匿名掲示板システム</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/boards" className="card">
          <h2 className="text-xl font-semibold mb-2">掲示板一覧</h2>
          <p className="text-gray-600">カテゴリ別の掲示板を閲覧できます。</p>
        </Link>
        <Link href="/boards/new" className="card">
          <h2 className="text-xl font-semibold mb-2">掲示板作成</h2>
          <p className="text-gray-600">新しい掲示板を作成できます。</p>
        </Link>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">最近の投稿</h2>
          <p className="text-gray-600">最近投稿されたスレッドが表示されます。</p>
        </div>
      </div>
    </div>
  );
} 