"use client";

import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, MessageSquare } from "lucide-react";
import { useAuth } from "@/provider/auth-provider";
import { hrefs } from "@/constants/hrefs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Helper to get initials for avatar fallbacks
const getAcronym = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function CommentsSection({
  postId,
  postOwnerId,
  onCommentCountChange,
}: {
  postId: string;
  postOwnerId: string;
  onCommentCountChange?: (count: number) => void;
}) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch comments via React Query
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await hrefs.api.comment.getByPost.invoke(postId);
      const list = res.data.data || [];
      if (onCommentCountChange) {
        onCommentCountChange(list.length);
      }
      return list;
    },
  });

  const handleFocus = () => {
    if (!user) {
      toast.error("Please sign in to join the conversation!");
      textareaRef.current?.blur();
      return;
    }
    setIsFocused(true);
  };

  const handleCancel = () => {
    setNewComment("");
    setIsFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await hrefs.api.comment.create.invoke(postId, newComment.trim());
      setNewComment("");
      setIsFocused(false);
      toast.success("Comment posted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await hrefs.api.comment.delete.invoke(commentId);
      toast.success("Comment deleted.");
      refetch();
    } catch (err) {
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 mt-8 p-6 rounded-2xl bg-background/40 backdrop-blur-md border border-white/5 shadow-2xl">
      {/* Title / Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold tracking-tight text-white">
          {isLoading ? (
            <Skeleton className="h-6 w-24 bg-white/10" />
          ) : (
            `${comments.length} Comment${comments.length === 1 ? "" : "s"}`
          )}
        </h3>
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 items-start w-full">
        <Avatar className="h-10 w-10 border border-white/10 shrink-0">
          <AvatarImage
            src={user?.avatar}
            className="object-cover"
            alt={user?.name ?? "User"}
          />
          <AvatarFallback className="bg-accent text-white font-medium">
            {user ? getAcronym(user.name) : "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col gap-3">
          <Textarea
            ref={textareaRef}
            placeholder={user ? "Add a public comment..." : "Sign in to leave a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={handleFocus}
            rows={isFocused ? 3 : 1}
            className={cn(
              "w-full bg-accent/30 text-white placeholder-muted-foreground border-white/5 focus-visible:ring-1 focus-visible:ring-primary rounded-xl",
              "transition-all duration-300 resize-none min-h-[44px]",
              isFocused && "min-h-[96px] bg-accent/40"
            )}
          />

          {isFocused && (
            <div className="flex justify-end gap-2 items-center self-end animate-in fade-in slide-in-from-top-2 duration-200">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="rounded-full text-white/75 hover:text-white"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="rounded-full px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isSubmitting ? "Posting..." : "Comment"}
              </Button>
            </div>
          )}
        </div>
      </form>

      <Separator className="bg-white/5 my-2" />

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="flex flex-col gap-5 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 items-start w-full">
              <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-4 w-32 bg-white/5" />
                <Skeleton className="h-5 w-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground animate-in fade-in duration-500">
          <MessageSquare className="h-12 w-12 text-white/10 mb-4" />
          <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        /* Comments List */
        <div className="flex flex-col gap-6">
          {comments.map((comment) => {
            const isCommentOwner = user && comment.user?._id?.toString() === user.id;
            const isPostOwner = user && postOwnerId === user.id;
            const isAdmin = user && user.role === "admin";
            const canDelete = isCommentOwner || isPostOwner || isAdmin;

            return (
              <div
                key={comment._id}
                className="flex gap-4 items-start w-full group animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Avatar className="h-10 w-10 border border-white/5 shrink-0">
                  <AvatarImage
                    src={comment.user?.image}
                    className="object-cover"
                    alt={comment.user?.name ?? "User"}
                  />
                  <AvatarFallback className="bg-accent text-white/90">
                    {getAcronym(comment.user?.name ?? "User")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white/90 truncate">
                      {comment.user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground/80 shrink-0">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed break-words whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>

                {canDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(comment._id)}
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
                    title="Delete Comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
