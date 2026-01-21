import RelatedPosts from "@/components/custom/post/related-posts";
import getRelatedPosts from "@/functions/get-related-posts";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const relatedPosts = await getRelatedPosts(id);
  // return <div className="w-full h-[500px] bg-cyan-500"></div>;
  return (
    <>
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}
