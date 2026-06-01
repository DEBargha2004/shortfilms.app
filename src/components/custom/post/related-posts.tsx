import { Post } from '@/types/post'
import PostCard, { TPost } from './post-card'

export default function RelatedPosts ({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post, post_idx) => (
        <PostCard
          post={post as never as TPost}
          key={`${post.id}${post_idx}`}
          orientation={'adjust'}
          className=''
        />
      ))}
    </>
  )
}
