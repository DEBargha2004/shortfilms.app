import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePlayer from "@/provider/video-player-provider";
import { SettingsIcon } from "lucide-react";

export default function Settings() {
  const { mediaInfo, activeBitrate, handleSetActiveBitrate } = usePlayer();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuRadioGroup
          value={activeBitrate?.toString()}
          onValueChange={(v) => handleSetActiveBitrate(Number(v))}
        >
          {mediaInfo?.bitrateList.map((bitrate) => (
            <DropdownMenuRadioItem value={bitrate.id!} key={bitrate.id}>
              {bitrate.height}p
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
