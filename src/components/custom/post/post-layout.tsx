import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

export const PostLayout = forwardRef<
  HTMLDivElement,
  {} & HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    className={cn(
      "w-full h-full px-3 py-2",
      "flex lg:flex-row flex-col items-stretch lg:items-start justify-start lg:justify-center gap-5",
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </div>
));

PostLayout.displayName = "PostLayout";
