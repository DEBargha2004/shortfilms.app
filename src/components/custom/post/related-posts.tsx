import { Post } from '@/types/post'
import PostCard from './post-card'

export default function RelatedPosts ({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post, post_idx) => (
        <PostCard
          post={post}
          key={`${post.id}${post_idx}`}
          orientation={'adjust'}
          className=''
        />
      ))}
    </>
  )
}
