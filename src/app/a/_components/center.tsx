import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function Center({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-[calc(100svh-4rem)] w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
