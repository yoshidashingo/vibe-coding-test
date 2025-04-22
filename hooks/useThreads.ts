import useSWR from 'swr'
import { Thread } from '@/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useThreads(boardId: string) {
  const { data, error, isLoading, mutate } = useSWR<Thread[]>(
    boardId ? `/api/boards/${boardId}/threads` : null,
    fetcher
  )

  return {
    threads: data,
    isLoading,
    isError: error,
    mutate
  }
} 