import PostLoading from "@/components/custom/post/post-loading";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <PostLoading key={i} orientation="adjust" />
      ))}
    </>
  );
}
