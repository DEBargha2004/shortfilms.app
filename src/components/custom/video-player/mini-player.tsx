import usePlayer from "@/provider/video-player-provider";
import { PictureInPicture2 } from "lucide-react";

export default function MiniPlayer() {
  const { handleEnterMiniPlayer } = usePlayer();
  return (
    <div onClick={handleEnterMiniPlayer}>
      <PictureInPicture2 />
    </div>
  );
}
