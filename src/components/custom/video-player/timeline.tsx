import usePlayer from "@/provider/video-player-provider";
import { cn, formatSeconds } from "@/lib/utils";
import { MouseEvent, useRef, useState } from "react";

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { duration, handleSeek } = usePlayer();
  const bufferPercentage = Math.floor(
    ((duration.buffer + duration.current) / (duration.total || 1)) * 100
  );
  const currentPlaybackPercentage = Math.floor(
    (duration.current / (duration.total || 1)) * 100
  );
  const [isHovering, setIsHovering] = useState(false);
  const [hoverx, setHoverx] = useState(0);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const rect = timelineRef.current?.getBoundingClientRect();
    const offsetX = e.clientX - (rect?.left ?? 0);
    const timelineLength = timelineRef.current?.clientWidth;
    setHoverx(timelineLength ? offsetX / timelineLength : 0);
  };

  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovering(false);
    setHoverx(0);
  };

  const handleMouseClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSeek(duration.total * hoverx);
  };

  return (
    <div
      className={cn(
        "relative w-[calc(100%-20px)] bg-accent/60 mx-auto cursor-pointer",
        "h-1 hover:h-2 transition-all"
      )}
      ref={timelineRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleMouseClick}
    >
      {isHovering && (
        <div
          className="absolute bottom-3 text-white -translate-x-1/2"
          style={{ left: `${hoverx * 100}%` }}
        >
          <span className="text-sm font-medium">
            {formatSeconds(Math.floor(duration.total * hoverx))}
          </span>
        </div>
      )}
      <div className="relative size-full overflow-hidden">
        <div
          className={cn("absolute top-0 left-0 h-full bg-accent-foreground")}
          style={{ width: `${bufferPercentage}%` }}
        />
        <div
          className="absolute top-0 left-0 h-full bg-red-500"
          style={{ width: `${currentPlaybackPercentage}%` }}
        />
      </div>
      <span
        className={cn(
          "size-3 rounded-full bg-red-500",
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        )}
        style={{ left: `${currentPlaybackPercentage}%` }}
      />
    </div>
  );
}
