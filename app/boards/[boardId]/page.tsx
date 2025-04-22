import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Board, Thread } from '@/app/types';

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const board = await prisma.board.findUnique({
    where: { id: params.boardId },
    include: {
      threads: {
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { posts: true },
          },
        },
      },
    },
  }) as Board | null;

  if (!board) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{board.name}</h1>
        <p className="text-gray-600 mb-2">{board.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>カテゴリ: {board.category}</span>
          <span>作成日: {formatDistanceToNow(board.createdAt, { locale: ja, addSuffix: true })}</span>
        </div>
      </div>

      <div className="mb-6">
        <Link
          href={`/boards/${board.id}/threads/new`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          新規スレッド作成
        </Link>
      </div>

      <div className="space-y-4">
        {board.threads.map((thread: Thread) => (
          <div
            key={thread.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <Link href={`/boards/${board.id}/threads/${thread.id}`}>
              <h2 className="text-xl font-semibold mb-2">{thread.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>投稿数: {thread._count.posts}</span>
                <span>
                  作成日:{' '}
                  {formatDistanceToNow(thread.createdAt, {
                    locale: ja,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          </div>
        ))}

        {board.threads.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            この掲示板にはまだスレッドがありません。
          </p>
        )}
      </div>
    </div>
  );
} 