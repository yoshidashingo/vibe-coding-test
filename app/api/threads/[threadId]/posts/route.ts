import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

// 投稿一覧を取得
export async function GET(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        threadId: params.threadId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: '投稿の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 新しい投稿を作成
export async function POST(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const { content, nickname, trip } = await request.json()
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown'

    if (!content) {
      return NextResponse.json(
        { error: '投稿内容は必須です' },
        { status: 400 }
      )
    }

    // ユーザーを作成または取得
    const user = await prisma.user.upsert({
      where: {
        id: ipAddress // 一時的な対応としてIPアドレスをIDとして使用
      },
      update: {
        lastPostedAt: new Date()
      },
      create: {
        id: ipAddress,
        ipAddress
      }
    })

    // 投稿を作成
    const post = await prisma.post.create({
      data: {
        content,
        nickname,
        trip,
        ipAddress,
        threadId: params.threadId,
        userId: user.id
      }
    })

    // スレッドの最終更新日時と投稿数を更新
    await prisma.thread.update({
      where: {
        id: params.threadId
      },
      data: {
        lastPostedAt: new Date(),
        postCount: {
          increment: 1
        }
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: '投稿の作成に失敗しました' },
      { status: 500 }
    )
  }
} 