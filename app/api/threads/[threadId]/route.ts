import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const thread = await prisma.thread.findUnique({
      where: {
        id: params.threadId
      }
    })

    if (!thread) {
      return NextResponse.json(
        { error: 'スレッドが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(thread)
  } catch (error) {
    return NextResponse.json(
      { error: 'スレッドの取得に失敗しました' },
      { status: 500 }
    )
  }
} 