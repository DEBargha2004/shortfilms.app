'use server'

import { repetitive_sample_posts } from '@/constants/genre'
import { Post } from '@/types/post'

export default async function getRelatedPosts (id: string): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))

  // throw new Error('Failed to fetch posts')

  return repetitive_sample_posts
}
