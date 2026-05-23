"use client";

import { TPostCreateSchema } from "@/schema/post-create";
import { YoutubePreview } from "../forms/post-create/video-data";

export default function VideoPlayer({
  video,
}: {
  video: TPostCreateSchema["video"];
}) {
  if (video.type === "link")
    return (
      <div className="relative w-full aspect-video max-h-[calc(100dvh-200px)] border mx-auto">
        <YoutubePreview url={video.href ?? ""} />
      </div>
    );

  return (
    <div className="relative w-full aspect-video max-h-[calc(100dvh-200px)] border mx-auto">
      <iframe
        src={`https://iframe.mediadelivery.net/embed/${video.libraryId}/${video.path}?autoplay=true`}
        loading="lazy"
        style={{ border: "none" }}
        allowFullScreen={true}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        className="size-full w-[calc(100%-2px)] h-[calc(100%-1px)]"
      ></iframe>
    </div>
  );
}
