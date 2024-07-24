import { PostCard, VideoContaner } from '@/components/custom'
import { repetitive_sample_posts } from '@/constants/genre'

export default function Page ({ params: { id } }: { params: { id: string } }) {
  return (
    <div className='w-full h-full flex lg:flex-row flex-col items-stretch lg:items-start justify-start lg:justify-center gap-5 p-5'>
      <VideoContaner className=''>
        <div className='w-full aspect-video rounded-lg bg-red-600'></div>
      </VideoContaner>
      <div className='lg:w-[400px] w-full flex flex-col items-stretch justify-start gap-2.5 shrink-0'>
        {repetitive_sample_posts.map(post => (
          <PostCard
            post={post}
            key={post.id}
            orientation='horizontal'
            hideAvatar
            className=''
          />
        ))}
      </div>
    </div>
  )
}
