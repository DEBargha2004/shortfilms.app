import {
  PostsContainer,
  SideNav,
  GenreTitle,
  PostCard
} from '@/components/custom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { posts_with_genre } from '@/constants/genre'

export default function Home () {
  return (
    <main className='flex lg:flex-row flex-col-reverse justify-start items-start h-full lg:pl-4 pl-1 lg:gap-4'>
      <SideNav className='shrink-0 ' />
      <div className='w-full grid gap-6  h-full overflow-y-auto '>
        {posts_with_genre.map(genre => (
          <PostsContainer key={genre.title}>
            <GenreTitle className='lg:ml-0 ml-2'>{genre.title}</GenreTitle>
            <Carousel className='w-full overflow-hidden'>
              <CarouselContent className='gap-2 ml-0'>
                {genre.posts.map(post => (
                  <CarouselItem key={post.id} className='basis-auto pl-0'>
                    <PostCard
                      key={post.id}
                      post={post}
                      className='min-w-[300px]'
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className='right-0 bg-black/50 hover:bg-black/80' />
              <CarouselPrevious className='left-0 bg-black/50 hover:bg-black/80' />
            </Carousel>
          </PostsContainer>
        ))}
      </div>
    </main>
  )
}
