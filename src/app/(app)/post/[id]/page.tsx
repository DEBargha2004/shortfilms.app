import PostMain from "@/components/custom/post/post-main";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [res, err] = await tryCatch(
    hrefs.api.post.getPost.invoke(id, process.env.NEXT_PUBLIC_API_URL)
  );

  if (!res?.data) return notFound();

  return <PostMain post={res.data} />;
}
