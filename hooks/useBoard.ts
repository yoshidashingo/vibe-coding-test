import useSWR from 'swr'
import { Board } from '@/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBoard(boardId: string) {
  const { data, error, isLoading } = useSWR<Board>(
    boardId ? `/api/boards/${boardId}` : null,
    fetcher
  )

  return {
    board: data,
    isLoading,
    isError: error
  }
} 