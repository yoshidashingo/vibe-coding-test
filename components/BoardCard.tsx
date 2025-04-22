import Link from 'next/link'
import { Board } from '@/types'

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/boards/${board.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{board.name}</h2>
        <p className="text-gray-600 mb-4">{board.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">カテゴリ: {board.category}</span>
          <span className="text-sm text-gray-500">
            {new Date(board.createdAt).toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>
    </Link>
  )
} 