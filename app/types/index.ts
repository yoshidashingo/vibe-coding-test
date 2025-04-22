export interface Board {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  threads: Thread[];
}

export interface Thread {
  id: string;
  title: string;
  createdAt: Date;
  boardId: string;
  _count: {
    posts: number;
  };
} 