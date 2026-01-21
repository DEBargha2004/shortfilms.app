import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

export const PostLayout = forwardRef<
  HTMLDivElement,
  {} & HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    className={cn(
      "w-[calc(100%-8rem)] mx-auto h-full px-3 py-2",
      "grid 2xl:grid-cols-[3fr_1fr] xl:grid-cols-[4fr_1fr] gap-10",
      // "flex lg:flex-row flex-col items-stretch lg:items-start justify-start lg:justify-center gap-5",
      className
    )}
    {...props}
    id="post-layout"
    ref={ref}
  >
    {children}
  </div>
));

PostLayout.displayName = "PostLayout";
