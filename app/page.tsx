'use client'

import { useBoards } from '@/hooks/useBoards'
import { BoardCard } from '@/components/BoardCard'
import { CreateBoardForm } from '@/components/CreateBoardForm'

export default function Home() {
  const { boards, isLoading, isError } = useBoards()

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-600">掲示板の読み込みに失敗しました</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">匿名掲示板</h1>
        <CreateBoardForm />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full text-center text-gray-500">読み込み中...</div>
          ) : boards?.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">掲示板がありません</div>
          ) : (
            boards?.map((board) => <BoardCard key={board.id} board={board} />)
          )}
        </div>
      </div>
    </div>
  )
} 