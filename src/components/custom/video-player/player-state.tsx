import usePlayer from "@/provider/video-player-provider";
import { Loader2, Pause, Play } from "lucide-react";

export default function PlayerStateController() {
  const { playerState, togglePlayerState } = usePlayer();

  return (
    <div
      onClick={togglePlayerState}
      className="cursor-pointer [&>svg]:fill-current"
    >
      {playerState === "play" ? <Pause /> : <Play />}
    </div>
  );
}

export function PlayerState() {
  const { isBuffering } = usePlayer();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {isBuffering && (
        <Loader2 size={30} style={{ scale: 2 }} className="animate-spin" />
      )}
    </div>
  );
}
