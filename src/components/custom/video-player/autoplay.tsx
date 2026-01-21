import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePlayer from "@/provider/video-player-provider";
import { Pause, Play } from "lucide-react";

export default function AutoPlay({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { autoplay, setAutoplay } = usePlayer();
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "w-10 h-4 rounded-full px-0 bg-stone-600 hover:bg-stone-600 flex",
        autoplay ? "justify-end" : "justify-start",
        className
      )}
      {...props}
      onClick={() => setAutoplay(!autoplay)}
    >
      <div
        className={cn(
          "size-5 rounded-full bg-stone-500 transition-all",
          "grid place-content-center [&_svg]:size-3 [&_svg]:fill-current"
        )}
      >
        {autoplay ? <Pause /> : <Play />}
      </div>
    </Button>
  );
}
