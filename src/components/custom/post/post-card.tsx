"use client";

import { cn } from "@/lib/utils";
import { Orientation, type Post } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateTimeDiffWithUnit } from "@/functions/calculate-time-diff-with-unit";
import Link from "next/link";
import { hrefs } from "@/constants/hrefs";
import { MoreVertical } from "lucide-react";
import { templateClass } from "@/constants/template-class";
import { getEmbedUrl, getThumbnailUrl } from "@/functions/get-url";
import Image from "next/image";

export default function PostCard({
  post,
  className,
  orientation = "vertical",
  hideAvatar,
}: {
  post: Post;
  className?: string;
  hideAvatar?: boolean;
  orientation?: Orientation;
}) {
  return (
    <PostcardWrapper orientation={orientation} className={cn("", className)}>
      <Link
        href={hrefs.post(post.id)}
        className={cn("shrink-0", templateClass.post.video(orientation))}
        scroll={false}
      >
        <div className={cn("w-full aspect-video rounded overflow-hidden")}>
          <img
            src={getThumbnailUrl(post.image_link_16x9)}
            className="w-full aspect-video"
          />
        </div>
      </Link>
      <div className="w-full flex justify-between gap-3 items-start">
        <Link href={hrefs.user(post.username)}>
          <Avatar
            className={cn(
              "w-8 h-8",
              hideAvatar
                ? "hidden"
                : orientation === "vertical"
                ? "block"
                : orientation === "horizontal"
                ? "hidden"
                : "lg:hidden block"
            )}
          >
            <AvatarImage />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Link>

        <div className="w-full flex flex-col justify-start items-start">
          <Link href={hrefs.post(post.id)}>
            <h2
              className={cn(
                "line-clamp-2",
                orientation === "vertical"
                  ? "@lg:text-lg text-base"
                  : "@lg:text-base text-sm"
              )}
            >
              {post.title}
            </h2>
          </Link>
          <Link href={hrefs.user(post.username)}>
            <p
              className={cn(
                "opacity-60",
                orientation === "vertical"
                  ? "@lg:text-base text-sm "
                  : "@lg:text-base text-sm"
              )}
            >
              {post.username}
            </p>
          </Link>
          <div
            className={cn(
              "flex justify-start items-center gap-2 [&>p]:opacity-60",
              orientation === "vertical"
                ? "@lg:[&>p]:text-sm [&>p]:text-xs"
                : "@lg:[&>p]:text-sm [&>p]:text-xs"
            )}
          >
            <p>27K Views</p>
            <p>•</p>
            <p>{calculateTimeDiffWithUnit(post.timestamp)}&nbsp;ago</p>
          </div>
        </div>
        <div className="flex self-stretch items-start justify-center w-5">
          <div
            className={cn(
              "rounded-full h-8 w-8 grid place-content-center hover:bg-accent/60 transition-all shrink-0"
            )}
          >
            <MoreVertical className={cn("cursor-pointer w-4 h-4")} />
          </div>
        </div>
      </div>
    </PostcardWrapper>
  );
}

export function PostcardWrapper({
  children,
  className,
  orientation = "vertical",
}: {
  children: React.ReactNode;
  className?: string;
  orientation: Orientation;
}) {
  return (
    <div
      className={cn(
        "w-full shrink-0 flex gap-2 @container",
        className,
        orientation === "vertical"
          ? "flex-col"
          : orientation === "horizontal"
          ? "flex-row"
          : "lg:flex-row flex-col"
      )}
    >
      {children}
    </div>
  );
}
