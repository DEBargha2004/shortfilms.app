import { type Post } from '@/types/post'
import { sample_posts } from './sample-post'

export const repetitive_sample_posts = [
  ...sample_posts,
  ...sample_posts,
  ...sample_posts
]

export const posts_with_genre: { title: string; posts: Post[] }[] = [
  {
    title: 'Action',
    posts: sample_posts
  },
  {
    title: 'Comedy',
    posts: sample_posts
  },
  {
    title: 'Drama',
    posts: sample_posts
  },
  {
    title: 'Horror',
    posts: sample_posts
  },
  {
    title: 'Thriller',
    posts: sample_posts
  }
]

export const genre = posts_with_genre.map(genre => genre.title)
