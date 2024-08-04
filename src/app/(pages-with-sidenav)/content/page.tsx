import { ContentList } from '@/components/custom'
import { PostCard } from '@/components/custom/post'
import { CarouselItem } from '@/components/ui/carousel'
import { posts_with_genre } from '@/constants/genre'

export default function Page () {
  return (
    <div className='px-2 h-full w-full overflow-y-scroll scroller space-y-3 @container'>
      {posts_with_genre.map(genre => (
        <ContentList key={genre.title}>
          <ContentList.Title className='font-bold'>
            {genre.title}
          </ContentList.Title>
          <ContentList.CardsContainer className=''>
            {genre.posts.map(post => (
              <CarouselItem key={post.id} className='basis-auto'>
                <PostCard
                  post={post}
                  orientation='vertical'
                  className='w-[300px]'
                />
              </CarouselItem>
            ))}
          </ContentList.CardsContainer>
        </ContentList>
      ))}
    </div>
  )
}
