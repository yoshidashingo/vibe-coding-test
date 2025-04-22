import useSWR from 'swr'
import { Board } from '@/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBoards() {
  const { data, error, isLoading, mutate } = useSWR<Board[]>('/api/boards', fetcher)

  return {
    boards: data,
    isLoading,
    isError: error,
    mutate
  }
} 