import Link from 'next/link'
import { Thread } from '@/types'

interface ThreadCardProps {
  thread: Thread
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Link href={`/threads/${thread.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{thread.title}</h2>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>投稿数: {thread._count?.posts || 0}</span>
          <span>
            最終更新: {new Date(thread.lastPostedAt).toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>
    </Link>
  )
} 