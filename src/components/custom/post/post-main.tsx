"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChannelOverview } from "./channel-overview";
import { VideoContaner, VideoTitle } from "./video-container";
import { LucideDownload, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import VideoPlayer from "../video-player";
import { Post, Doc, User } from "@/types/db";
import { useAuth } from "@/provider/auth-provider";
import { hrefs } from "@/constants/hrefs";
import { toast } from "sonner";
import CommentsSection from "./comments-section";

export default function PostMain({
  post,
}: {
  post: Doc<Post & { user: Doc<User>; userReaction?: 'like' | 'dislike' | null }>;
}) {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
  const [dislikesCount, setDislikesCount] = useState(post.dislikesCount ?? 0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(post.userReaction ?? null);

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!user) {
      toast.error(`Please sign in to ${type} this video!`);
      return;
    }

    // Save previous state for rollback
    const prevReaction = userReaction;
    const prevLikes = likesCount;
    const prevDislikes = dislikesCount;

    // Optimistic UI updates
    let newReaction: 'like' | 'dislike' | null = null;
    let newLikes = likesCount;
    let newDislikes = dislikesCount;

    if (type === 'like') {
      if (userReaction === 'like') {
        newReaction = null;
        newLikes = Math.max(0, newLikes - 1);
      } else if (userReaction === 'dislike') {
        newReaction = 'like';
        newLikes += 1;
        newDislikes = Math.max(0, newDislikes - 1);
      } else {
        newReaction = 'like';
        newLikes += 1;
      }
    } else if (type === 'dislike') {
      if (userReaction === 'dislike') {
        newReaction = null;
        newDislikes = Math.max(0, newDislikes - 1);
      } else if (userReaction === 'like') {
        newReaction = 'dislike';
        newLikes = Math.max(0, newLikes - 1);
        newDislikes += 1;
      } else {
        newReaction = 'dislike';
        newDislikes += 1;
      }
    }

    setUserReaction(newReaction);
    setLikesCount(newLikes);
    setDislikesCount(newDislikes);

    try {
      const res = await hrefs.api.post.react.invoke(post._id, newReaction);
      // Synchronize exact counts from database response
      setLikesCount(res.data.likesCount);
      setDislikesCount(res.data.dislikesCount);
      setUserReaction(res.data.userReaction);

      // Positive visual feedback toast
      if (type === 'like') {
        toast.success(newReaction === 'like' ? "Added to Liked Videos!" : "Like removed.");
      } else {
        toast.success(newReaction === 'dislike' ? "Video Disliked." : "Dislike removed.");
      }
    } catch (err) {
      // Rollback on failure
      setUserReaction(prevReaction);
      setLikesCount(prevLikes);
      setDislikesCount(prevDislikes);
      toast.error("Failed to update reaction.");
    }
  };

  return (
    <VideoContaner className="grid gap-3 @container h-fit" id="post-main">
      <VideoPlayer video={post.video} />
      <VideoTitle>{post.title}</VideoTitle>
      
      {/* Channel & Action buttons */}
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
          {/* Like / Dislike reaction buttons */}
          <VideoActionsContainer>
            <button
              onClick={() => handleReaction('like')}
              className={cn(
                "flex justify-between items-center gap-2 focus:outline-none hover:text-white transition-colors duration-200",
                userReaction === 'like' ? "text-primary font-bold" : "text-white/80"
              )}
            >
              <ThumbsUp
                className="h-5 w-5"
                fill={userReaction === 'like' ? "currentColor" : "none"}
              />
              <span className="text-sm font-semibold">{likesCount}</span>
            </button>
            
            <Separator orientation="vertical" className="bg-white/10 h-5" />
            
            <button
              onClick={() => handleReaction('dislike')}
              className={cn(
                "flex justify-between items-center gap-1 focus:outline-none hover:text-white transition-colors duration-200",
                userReaction === 'dislike' ? "text-primary" : "text-white/80"
              )}
              title="Dislike video"
            >
              <ThumbsDown
                className="h-5 w-5"
                fill={userReaction === 'dislike' ? "currentColor" : "none"}
              />
            </button>
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

      {/* Details / Description box */}
      <PostMetaData className="mt-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-2">
          <span>{post.details?.completionDate ? new Date(post.details.completionDate).toLocaleDateString() : "Uploaded just now"}</span>
          {post.details?.language && (
            <>
              <span>•</span>
              <span>{post.details.language}</span>
            </>
          )}
        </div>
        <p className="text-sm text-white/90 whitespace-pre-line leading-relaxed">
          {post.description || "No description provided."}
        </p>
      </PostMetaData>

      {/* Gorgeous Comments Section */}
      <CommentsSection postId={post._id} postOwnerId={post.user?._id?.toString() ?? ""} />
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
        "bg-accent/80 hover:bg-accent transition-all rounded-full p-2 px-4",
        "flex justify-start items-center gap-4 border border-white/5 shadow-md",
      )}
    >
      {children}
    </div>
  );
};

export const PostMetaData = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 rounded-2xl bg-accent/40 backdrop-blur-sm border border-white/5 shadow-lg", className)}>
      {children}
    </div>
  );
};
