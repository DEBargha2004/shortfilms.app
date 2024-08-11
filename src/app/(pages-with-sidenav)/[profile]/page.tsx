import { PostCard } from "@/components/custom/post";
import { repetitive_sample_posts } from "@/constants/genre";

export default function Page({
  params: { profile },
}: {
  params: { profile: string };
}) {
  profile = profile.replace(/%40/, "");
  return (
    <div className="grid @4xl:grid-cols-5 @3xl:grid-cols-4 @2xl:grid-cols-3 @lg:grid-cols-2 gap-2 gap-y-5">
      {repetitive_sample_posts.map((post) => (
        <PostCard key={post.id} post={post} orientation="vertical" hideAvatar />
      ))}
    </div>
  );
}
