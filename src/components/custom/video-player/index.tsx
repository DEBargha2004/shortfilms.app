"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

export default function VideoPlayer({
  libraryId,
  videoId,
}: {
  videoId: string;
  libraryId: string;
}) {
  return (
    <div className="relative w-full aspect-video max-h-[calc(100dvh-200px)] border mx-auto">
      <iframe
        src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true`}
        loading="lazy"
        style={{ border: "none" }}
        allowFullScreen={true}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        className="size-full w-[calc(100%-2px)] h-[calc(100%-1px)]"
      ></iframe>
    </div>
  );
}
