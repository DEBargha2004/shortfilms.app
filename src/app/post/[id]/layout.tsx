import { PostLayout } from "@/components/custom/post/post-layout";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
  related,
}: {
  children: React.ReactNode;
  related: React.ReactNode;
}) {
  return (
    <PostLayout>
      {children}
      {related}
    </PostLayout>
  );
}
