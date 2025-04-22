'use client'

import { useBoard } from '@/hooks/useBoard'
import { useThreads } from '@/hooks/useThreads'
import { ThreadCard } from '@/components/ThreadCard'
import { CreateThreadForm } from '@/components/CreateThreadForm'
import Link from 'next/link'

export default function BoardPage({ params }: { params: { boardId: string } }) {
  const { board, isLoading: isBoardLoading, isError: isBoardError } = useBoard(params.boardId)
  const { threads, isLoading: isThreadsLoading, isError: isThreadsError } = useThreads(params.boardId)

  if (isBoardError || isThreadsError) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-600">データの読み込みに失敗しました</div>
        </div>
      </div>
    )
  }

  if (isBoardLoading || isThreadsLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center text-gray-500">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-600">掲示板が見つかりません</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            ← 掲示板一覧に戻る
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{board.name}</h1>
        <p className="text-gray-600 mb-8">{board.description}</p>
        <CreateThreadForm boardId={board.id} />
        <div className="grid grid-cols-1 gap-6">
          {threads?.length === 0 ? (
            <div className="text-center text-gray-500">スレッドがありません</div>
          ) : (
            threads?.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
          )}
        </div>
      </div>
    </div>
  )
} 