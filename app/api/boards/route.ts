import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 掲示板一覧を取得
export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(boards)
  } catch (error) {
    return NextResponse.json(
      { error: '掲示板の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 新しい掲示板を作成
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, category } = body

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    const board = await prisma.board.create({
      data: {
        name,
        description,
        category
      }
    })

    return NextResponse.json(board)
  } catch (error) {
    return NextResponse.json(
      { error: '掲示板の作成に失敗しました' },
      { status: 500 }
    )
  }
} 