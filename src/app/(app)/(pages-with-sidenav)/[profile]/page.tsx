import PostCard from "@/components/custom/post/post-card";
import { repetitive_sample_posts } from "@/constants/genre";

export default async function Page({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  let { profile } = await params;
  profile = profile.replace(/%40/, "");
  return (
    <div className="grid @4xl:grid-cols-5 @3xl:grid-cols-4 @2xl:grid-cols-3 @lg:grid-cols-2 gap-2 gap-y-5">
      {repetitive_sample_posts.map((post, idx) => (
        <PostCard key={idx} post={post} orientation="vertical" hideAvatar />
      ))}
    </div>
  );
}
