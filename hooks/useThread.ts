import useSWR from 'swr'
import { Thread } from '@/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useThread(threadId: string) {
  const { data, error, isLoading, mutate } = useSWR<Thread>(
    threadId ? `/api/threads/${threadId}` : null,
    fetcher
  )

  return {
    thread: data,
    isLoading,
    isError: error,
    mutate
  }
} 