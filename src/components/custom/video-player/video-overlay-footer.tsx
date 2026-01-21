import { cn } from "@/lib/utils";

export default function VideoOverlayFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "absolute bottom-0 left-0 h-fit min-h-10 w-full",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
