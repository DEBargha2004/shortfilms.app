import { Button } from "@/components/ui/button";
import { ChannelOverview } from "./channel-overview";
import { VideoContaner, VideoTitle } from "./video-container";
import { LucideDownload, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import VideoPlayer from "../video-player";
import { Post } from "../../../../../backend/src/modules/post/entities/post.entity";
import { Doc } from "../../../../../backend/src/types/doc";
import { User } from "../../../../../backend/src/modules/user/user.entity";

export default function PostMain({
  post,
}: {
  post: Doc<Post & { user: Doc<User> }>;
}) {
  return (
    <VideoContaner className="grid gap-3 @container h-fit" id="post-main">
      <VideoPlayer video={post.video} />
      <VideoTitle>{post.title}</VideoTitle>
      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex @2xl:justify-start justify-between gap-4 items-center @2xl:w-fit w-full shrink-0">
          <ChannelOverview
            image=""
            subscribers={1234}
            title={post.user?.name}
          />
          <div className="flex justify-end items-start gap-2">
            <Button className="rounded-full">Subscribe</Button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <VideoActionsContainer>
            <div className="flex justify-between items-center gap-1">
              <ThumbsUp className="cursor-pointer h-5" />
              <span className="text-sm">23</span>
            </div>
            <Separator orientation="vertical" className="bg-white h-5" />
            <ThumbsDown className="cursor-pointer h-5" />
          </VideoActionsContainer>
          <VideoActionsContainer>
            <div className="flex justify-between items-center gap-1">
              <Share2 className="h-5 cursor-pointer" />
              <span className="text-sm">Share</span>
            </div>
          </VideoActionsContainer>
          <VideoActionsContainer>
            <div className="flex justify-between items-center gap-1">
              <LucideDownload className="h-5 cursor-pointer" />
              <span className="text-sm">Download</span>
            </div>
          </VideoActionsContainer>
        </div>
      </div>
    </VideoContaner>
  );
}

export const VideoActionsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "bg-accent/80 hover:bg-accent transition-all rounded-full p-2 px-3",
        "flex justify-start items-center gap-3",
      )}
    >
      {children}
    </div>
  );
};

export const PostMetaData = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-3 rounded-lg bg-accent">{children}</div>;
};
