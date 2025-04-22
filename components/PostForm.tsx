'use client'

import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'

interface PostFormProps {
  threadId: string
}

export function PostForm({ threadId }: PostFormProps) {
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const [trip, setTrip] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate } = usePosts(threadId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/threads/${threadId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content.trim(),
          nickname: nickname.trim() || undefined,
          trip: trip.trim() || undefined
        })
      })

      if (!response.ok) {
        throw new Error('投稿の作成に失敗しました')
      }

      setContent('')
      setNickname('')
      setTrip('')
      mutate()
    } catch (error) {
      console.error('投稿エラー:', error)
      alert('投稿の作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          投稿内容
        </label>
        <textarea
          id="content"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            名前
          </label>
          <input
            type="text"
            id="nickname"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="trip" className="block text-sm font-medium text-gray-700">
            トリップ
          </label>
          <input
            type="text"
            id="trip"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? '投稿中...' : '投稿する'}
        </button>
      </div>
    </form>
  )
} 