import PostMain from "@/components/custom/post/post-main";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { AxiosRequestConfig } from "axios";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Retrieve user cookie context from incoming request
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const config: AxiosRequestConfig = {
    headers: userCookie ? { Cookie: `user=${userCookie}` } : {},
  };

  const [res, err] = await tryCatch(
    hrefs.api.post.getPost.invoke(
      id,
      process.env.NEXT_PUBLIC_API_URL,
      config
    )
  );

  if (!res?.data) return notFound();

  return <PostMain post={res.data} />;
}
