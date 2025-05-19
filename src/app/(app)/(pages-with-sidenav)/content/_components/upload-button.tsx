import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

const UploadButton = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement> & {}>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-start p-6 text-center",
        "rounded-sm hover:bg-accent/60 transition-all cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

const UploadButtonTitle = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement> & {}
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-base", className)} {...props} />
));

const UploadButtonDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement> & {}
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

UploadButton.displayName = "UploadButton";
UploadButtonTitle.displayName = "UploadButtonTitle";
UploadButtonDescription.displayName = "UploadButtonDescription";

export { UploadButton, UploadButtonTitle, UploadButtonDescription };
