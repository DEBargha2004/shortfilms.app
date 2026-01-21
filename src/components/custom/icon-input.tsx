import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function IconInput({
  className,
  startIcon,
  endIcon,
  ...props
}: React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}) {
  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <Input
        className={cn("", startIcon && "pl-12", endIcon && "pr-12")}
        {...props}
      />
      <div
        className={cn(
          "prefix block absolute top-1/2 -translate-y-1/2 left-0",
          startIcon &&
            "p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        )}
      >
        {startIcon}
      </div>
      <div
        className={cn(
          "suffix block absolute top-1/2 -translate-y-1/2 right-0",
          endIcon &&
            "p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        )}
      >
        {endIcon}
      </div>
    </div>
  );
}
