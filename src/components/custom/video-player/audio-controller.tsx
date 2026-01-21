import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

export default function AudioController() {
  return (
    <div className="group flex justify-start items-center gap-2">
      <Volume2 fill="currentColor" />
      <div
        className={cn(
          "h-3 w-0 transition-all group-hover:w-16 relative overflow-hidden",
          "flex items-center"
        )}
      >
        <div className="w-full h-1 bg-white" />
        <span className="size-3 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
