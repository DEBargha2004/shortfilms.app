"use client";

import { tryCatch } from "@/lib/utils";
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { hrefs } from "@/constants/hrefs";
import { useRouter } from "next/navigation";
import type { MediaPlayerClass, MediaInfo } from "dashjs";

type BufferLevelUpdatedData = {
  mediaType: string;
  bufferLevel: number;
};

type PlayerState = "play" | "pause";

type State = {
  playerState: PlayerState;
  autoplay: boolean;
  isFullScreen: boolean;
  isTheaterMode: boolean;
  mediaInfo?: MediaInfo;
  activeBitrate?: number;
  duration: { total: number; current: number; buffer: number };
  isVideoCompleted: boolean;
  isBuffering: boolean;
  isPlayerInitialised: boolean;
};
type Actions = {
  setPlayerState: (state: PlayerState) => void;
  play: () => void;
  pause: () => void;
  togglePlayerState: () => void;
  setAutoplay: (state: boolean) => void;
  handleEnterFullScreen: () => void;
  handleExitFullScreen: () => void;
  handleEnterMiniPlayer: () => void;
  handleEnterTheaterMode: () => void;
  handleExitTheaterMode: () => void;
  handleSetActiveBitrate: (id: number) => void;
  handleSeek: (seconds: number) => void;
};

export const videoPlayerContext = createContext<(State & Actions) | null>(null);

export function VideoPlayerProvider({
  ref,
  children,
}: {
  ref: RefObject<HTMLVideoElement>;
  children: React.ReactNode;
}) {
  const [playerState, setPlayerState] = useState<PlayerState>("play");
  const [duration, setDuration] = useState({
    total: 0,
    current: 0,
    buffer: 0,
  });
  const [autoplay, setAutoplay] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo>();
  const [activeBitrate, setActiveBitrate] = useState<number>();
  const [isVideoCompleted, setisVideoCompleted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlayerInitialised, setIsPlayerInitialised] = useState(false);

  const dashjsPlayer = useRef<MediaPlayerClass>();
  const playerContainerRef = useRef<HTMLDivElement>(null);

  async function play() {
    setPlayerState("play");
    return ref.current?.play();
  }

  function pause() {
    setPlayerState("pause");
    ref.current?.pause();
  }

  function togglePlayerState() {
    if (!isPlayerInitialised) return;
    setPlayerState((prev) => {
      if (prev === "pause") {
        play();
        return "play";
      }
      pause();
      return "pause";
    });
  }

  function seek(seconds: number) {
    if (!isPlayerInitialised) return;
    const player = dashjsPlayer.current;
    if (player) player.seek(seconds);
  }

  function handleEnterFullScreen() {
    const playerContainer = playerContainerRef.current;
    playerContainer
      ?.requestFullscreen()
      .then(() => {
        setIsFullScreen(true);
      })
      .catch((err) => console.log(err));
  }

  function handleExitFullScreen() {
    if (document.fullscreenEnabled && document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  }

  function handleEnterMiniPlayer() {
    const player = ref.current;

    if (player && !document.pictureInPictureElement) {
      tryCatch<PictureInPictureWindow, any>(
        player?.requestPictureInPicture()
      ).then(([res, err]) => {});
    }
  }

  function handleEnterTheaterMode() {
    const postLayout = document.getElementById("post-layout")!;
    const postMain = document.getElementById("post-main")!;

    postLayout.style.width = "100%";
    postMain.style.gridColumn = "span 2 / span 2";

    setIsTheaterMode(true);
  }

  function handleExitTheaterMode() {
    const postLayout = document.getElementById("post-layout")!;
    const postMain = document.getElementById("post-main")!;

    postLayout.style.width = "calc(100% - 8rem)";
    postMain.style.gridColumn = "span 1 / span 1";

    setIsTheaterMode(false);
  }

  function setAutoBitrateSwitching(state: { audio: boolean; video: boolean }) {
    dashjsPlayer.current?.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { video: state.video, audio: state.audio },
        },
      },
    });
  }

  function handleSetActiveBitrate(id: number) {
    setAutoBitrateSwitching({ video: false, audio: false });
    setActiveBitrate(id);
    console.log(id);
    dashjsPlayer.current?.setRepresentationForTypeById("video", id);
  }

  useEffect(() => {
    const player = ref.current;
    import("dashjs").then((dashjs) => {
      if (player) {
        const logicalPlayer = dashjs.MediaPlayer().create();

        logicalPlayer.addRequestInterceptor((req) => {
          if (req.url.endsWith("manifest.mpd")) return Promise.resolve(req);

          const urlArr = req.url.split("/");
          const [videoId, ...path] = urlArr.slice(-3);

          req.url = hrefs.api.stream.segments(videoId, path.join("/"));
          return Promise.resolve(req);
        });

        logicalPlayer.initialize(
          player,
          hrefs.api.stream.manifest("580f34b3-0946-4595-8c6b-d19805e45e9f"),
          true
        );

        logicalPlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
          const tracks = logicalPlayer.getTracksFor("video");
          setMediaInfo(tracks[0]);
        });

        logicalPlayer.on(
          dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED,
          (e) => {
            const currentTime = logicalPlayer.time();
            const bufferRanges = logicalPlayer.getBufferLength("video");

            setDuration((prev) => ({
              ...prev,
              current: currentTime,
              buffer: bufferRanges,
            }));
          }
        );

        logicalPlayer.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, () => {
          const manifest = logicalPlayer.getManifest() as any;
          if (manifest && manifest.mediaPresentationDuration)
            setDuration((prev) => ({
              ...prev,
              total: manifest.mediaPresentationDuration,
            }));
          setIsPlayerInitialised(true);
        });

        logicalPlayer.on(
          dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED,
          (e) => {
            console.log("Rendition change detected!");
            console.log("Event details:", e);
          }
        );

        logicalPlayer.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, () => {
          setisVideoCompleted(true);
          setPlayerState("pause");
        });

        logicalPlayer.on(dashjs.MediaPlayer.events.PLAYBACK_STALLED, () => {
          setIsBuffering(true);
        });

        logicalPlayer.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
          setIsBuffering(false);
        });

        dashjsPlayer.current = logicalPlayer;
      }
    });
  }, []);

  useEffect(() => {
    const player = ref.current;
    if (player && playerState === "play") {
      play().catch((err) => {
        setPlayerState("pause");
      });
    }
  }, []);

  return (
    <videoPlayerContext.Provider
      value={{
        playerState,
        autoplay,
        isFullScreen,
        isTheaterMode,
        mediaInfo,
        activeBitrate,
        duration,
        isVideoCompleted,
        isBuffering,
        isPlayerInitialised,
        setAutoplay,
        setPlayerState,
        play,
        pause,
        togglePlayerState,
        handleEnterFullScreen,
        handleExitFullScreen,
        handleEnterMiniPlayer,
        handleEnterTheaterMode,
        handleExitTheaterMode,
        handleSetActiveBitrate,
        handleSeek: seek,
      }}
    >
      <div className="size-full" ref={playerContainerRef}>
        {children}
      </div>
    </videoPlayerContext.Provider>
  );
}

export default function usePlayer() {
  const context = useContext(videoPlayerContext);

  if (!context)
    throw new Error("usePlayer should be used inside VideoPlayerProvider");

  return context;
}
