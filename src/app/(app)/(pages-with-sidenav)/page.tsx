import PostCard from "@/components/custom/post/post-card";
import {
  GenreTitle,
  PostCardContainer,
  PostsContainer,
} from "@/components/custom/post/posts-container";
import { posts_with_genre } from "@/constants/genre";

export default function Home() {
  return (
    <div className="w-full grid gap-6 px-2 h-full overflow-y-auto scroller">
      {posts_with_genre.map((genre) => (
        <PostsContainer key={genre.title}>
          <GenreTitle className="md:ml-0 ml-2">{genre.title}</GenreTitle>
          <PostCardContainer className="gap-3">
            {genre.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                className=""
                orientation="vertical"
              />
            ))}
          </PostCardContainer>
        </PostsContainer>
      ))}
    </div>
  );
}
