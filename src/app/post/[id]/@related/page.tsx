import RelatedPosts from "@/components/custom/post/related-posts";
import getRelatedPosts from "@/functions/get-related-posts";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const relatedPosts = await getRelatedPosts(id);
  return (
    <>
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}
