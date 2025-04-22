import useSWR from 'swr'
import { Post } from '@/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function usePosts(threadId: string) {
  const { data, error, isLoading, mutate } = useSWR<Post[]>(
    threadId ? `/api/threads/${threadId}/posts` : null,
    fetcher
  )

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate
  }
} 