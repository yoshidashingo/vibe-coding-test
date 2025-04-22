import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Board } from '@/app/types';

export default async function BoardsPage() {
  const boards = await prisma.board.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  }) as Board[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">掲示板一覧</h1>
        <Link
          href="/boards/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          新規掲示板作成
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board: Board) => (
          <Link
            key={board.id}
            href={`/boards/${board.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{board.name}</h2>
            <p className="text-gray-600 mb-4">{board.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(board.createdAt).toLocaleDateString()}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {board.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 