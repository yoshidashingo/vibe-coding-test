import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: params.boardId
      }
    })

    if (!board) {
      return NextResponse.json(
        { error: '掲示板が見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(board)
  } catch (error) {
    return NextResponse.json(
      { error: '掲示板の取得に失敗しました' },
      { status: 500 }
    )
  }
} 