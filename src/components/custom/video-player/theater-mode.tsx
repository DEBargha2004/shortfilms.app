import usePlayer from "@/provider/video-player-provider";
import { RectangleHorizontal } from "lucide-react";

export default function TheaterMode() {
  const { handleEnterTheaterMode, handleExitTheaterMode, isTheaterMode } =
    usePlayer();

  return (
    <div
      onClick={isTheaterMode ? handleExitTheaterMode : handleEnterTheaterMode}
    >
      <RectangleHorizontal />
    </div>
  );
}
