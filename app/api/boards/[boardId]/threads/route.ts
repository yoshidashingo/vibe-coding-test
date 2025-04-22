import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// スレッド一覧を取得
export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const threads = await prisma.thread.findMany({
      where: {
        boardId: params.boardId
      },
      orderBy: {
        lastPostedAt: 'desc'
      },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })
    return NextResponse.json(threads)
  } catch (error) {
    return NextResponse.json(
      { error: 'スレッドの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 新しいスレッドを作成
export async function POST(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const body = await request.json()
    const { title } = body

    if (!title) {
      return NextResponse.json(
        { error: 'タイトルは必須です' },
        { status: 400 }
      )
    }

    const thread = await prisma.thread.create({
      data: {
        title,
        boardId: params.boardId
      }
    })

    return NextResponse.json(thread)
  } catch (error) {
    return NextResponse.json(
      { error: 'スレッドの作成に失敗しました' },
      { status: 500 }
    )
  }
} 