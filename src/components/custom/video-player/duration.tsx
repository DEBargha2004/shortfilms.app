import { formatSeconds } from "@/lib/utils";
import usePlayer from "@/provider/video-player-provider";

export default function Duration() {
  const { duration, isPlayerInitialised } = usePlayer();

  const currentTime = formatSeconds(duration.current);
  const totalTime = formatSeconds(duration.total);

  return isPlayerInitialised ? (
    <p className="text-sm">
      {currentTime}/{totalTime}
    </p>
  ) : null;
}
