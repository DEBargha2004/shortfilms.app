import { cn } from "@/lib/utils";
import usePlayer from "@/provider/video-player-provider";
import { HTMLProps } from "react";

export default function Player({
  ref,
  className,
  ...props
}: HTMLProps<HTMLVideoElement>) {
  const { togglePlayerState } = usePlayer();
  return (
    <video
      ref={ref}
      className={cn("w-full h-full", className)}
      onClick={togglePlayerState}
      {...props}
    ></video>
  );
}
