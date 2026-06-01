import PostCard from "@/components/custom/post/post-card";
import {
  GenreTitle,
  PostCardContainer,
  PostsContainer,
} from "@/components/custom/post/posts-container";
import { hrefs } from "@/constants/hrefs";
import { env } from "@/lib/env";
import { tryCatch } from "@/lib/utils";

export const revalidate = 600;

export default async function Home() {
  const [res, err] = await tryCatch(
    hrefs.api.post.feed.invoke(env.NEXT_PUBLIC_API_URL),
  );

  const filteredRes = res?.data.filter((g) => g.contents.length);

  return (
    <div className="w-full grid gap-6 px-2 h-full overflow-y-auto scroller">
      {filteredRes?.map((genre) => (
        <PostsContainer key={genre.name}>
          <GenreTitle className="md:ml-0 ml-2">{genre.name}</GenreTitle>
          <PostCardContainer className="gap-3">
            {genre.contents.map((post: any, idx: number) => (
              <PostCard
                key={`${genre.name}-${post._id}-${idx}`}
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
