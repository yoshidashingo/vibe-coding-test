export interface Board {
  id: string
  name: string
  description: string
  category: string
  createdAt: Date
}

export interface Thread {
  id: string
  boardId: string
  title: string
  createdAt: Date
  lastPostedAt: Date
  postCount: number
  _count?: {
    posts: number
  }
}

export interface Post {
  id: string
  threadId: string
  userId: string
  content: string
  nickname?: string
  trip?: string
  imageUrl?: string
  ipAddress: string
  createdAt: Date
  user?: {
    id: string
    ipAddress: string
  }
}

export interface User {
  id: string
  ipAddress: string
  createdAt: Date
  lastPostedAt: Date
} 