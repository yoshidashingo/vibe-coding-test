'use client'

import { usePosts } from '@/hooks/usePosts'
import { useThread } from '@/hooks/useThread'
import { PostForm } from '@/components/PostForm'
import Link from 'next/link'

export default function ThreadPage({ params }: { params: { threadId: string } }) {
  const { thread, isLoading: isThreadLoading, isError: isThreadError } = useThread(params.threadId)
  const { posts, isLoading: isPostsLoading, isError: isPostsError } = usePosts(params.threadId)

  if (isThreadError || isPostsError) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-600">データの読み込みに失敗しました</div>
        </div>
      </div>
    )
  }

  if (isThreadLoading || isPostsLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center text-gray-500">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-600">スレッドが見つかりません</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <Link href={`/boards/${thread.boardId}`} className="text-indigo-600 hover:text-indigo-500">
            ← スレッド一覧に戻る
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{thread.title}</h1>
        <div className="mb-8">
          <PostForm threadId={thread.id} />
        </div>
        <div className="space-y-6">
          {posts?.length === 0 ? (
            <div className="text-center text-gray-500">投稿がありません</div>
          ) : (
            posts?.map((post) => (
              <div key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{post.nickname || '名無しさん'}</span>
                      {post.trip && <span className="text-gray-500 ml-2">◆{post.trip}</span>}
                    </div>
                    <div className="text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="whitespace-pre-wrap">{post.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 