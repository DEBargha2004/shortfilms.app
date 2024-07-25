import { SideNav } from '@/components/custom'
import {
  GenreTitle,
  PostCard,
  PostCardContainer,
  PostsContainer
} from '@/components/custom/post'
import { posts_with_genre } from '@/constants/genre'

export default function Home () {
  return (
    <main className='flex lg:flex-row flex-col-reverse justify-start items-start h-full lg:pl-4 pl-1 lg:gap-4'>
      <SideNav className='shrink-0 ' />
      <div className='w-full grid gap-6 px-2 h-full overflow-y-auto scroller'>
        {posts_with_genre.map(genre => (
          <PostsContainer key={genre.title}>
            <GenreTitle className='lg:ml-0 ml-2'>{genre.title}</GenreTitle>
            <PostCardContainer className='gap-3'>
              {genre.posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  className=''
                  orientation='vertical'
                />
              ))}
            </PostCardContainer>
          </PostsContainer>
        ))}
      </div>
    </main>
  )
}
