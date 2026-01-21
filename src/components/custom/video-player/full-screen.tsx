import usePlayer from "@/provider/video-player-provider";
import { Maximize, Minimize } from "lucide-react";

export default function FullScreen() {
  const { handleEnterFullScreen, handleExitFullScreen, isFullScreen } =
    usePlayer();

  return (
    <div
      className="cursor-pointer"
      onClick={isFullScreen ? handleExitFullScreen : handleEnterFullScreen}
    >
      {isFullScreen ? <Minimize /> : <Maximize />}
    </div>
  );
}
