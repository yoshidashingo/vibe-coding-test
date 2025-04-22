import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // テスト用の掲示板を作成
  const boards = await Promise.all([
    prisma.board.create({
      data: {
        name: '技術討論',
        description: 'プログラミングや技術に関する討論の場です',
        category: 'テクノロジー',
      },
    }),
    prisma.board.create({
      data: {
        name: '雑談',
        description: '気軽に話せる雑談スペース',
        category: '一般',
      },
    }),
    prisma.board.create({
      data: {
        name: 'ゲーム',
        description: 'ゲームに関する話題を共有しよう',
        category: 'エンターテイメント',
      },
    }),
  ]);

  // テスト用のユーザーを作成
  const user = await prisma.user.create({
    data: {
      id: '12345',
      ipAddress: '127.0.0.1',
    },
  });

  // 各掲示板にテストスレッドを作成
  for (const board of boards) {
    await prisma.thread.create({
      data: {
        title: `${board.name}のテストスレッド`,
        boardId: board.id,
        posts: {
          create: {
            content: `${board.name}へようこそ！このスレッドはテスト用に作成されました。`,
            ipAddress: user.ipAddress,
            userId: user.id,
          },
        },
      },
    });
  }

  console.log('シードデータの投入が完了しました');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 