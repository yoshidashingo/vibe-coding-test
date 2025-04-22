import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const { title, content } = await request.json();
    const headersList = headers();
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';

    if (!title || !content) {
      return NextResponse.json(
        { error: 'タイトルと本文は必須です' },
        { status: 400 }
      );
    }

    const board = await prisma.board.findUnique({
      where: { id: params.boardId },
    });

    if (!board) {
      return NextResponse.json(
        { error: '指定された掲示板が見つかりません' },
        { status: 404 }
      );
    }

    const user = await prisma.user.upsert({
      where: { id: ipAddress },
      update: {},
      create: { id: ipAddress, ipAddress },
    });

    const thread = await prisma.thread.create({
      data: {
        title,
        boardId: params.boardId,
        posts: {
          create: {
            content,
            userId: user.id,
            ipAddress: user.ipAddress,
          },
        },
      },
      include: {
        posts: true,
      },
    });

    return NextResponse.json(thread);
  } catch (error) {
    console.error('スレッド作成エラー:', error);
    return NextResponse.json(
      { error: 'スレッドの作成に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const threads = await prisma.thread.findMany({
      where: { boardId: params.boardId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(threads);
  } catch (error) {
    console.error('スレッド一覧取得エラー:', error);
    return NextResponse.json(
      { error: 'スレッド一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
} 