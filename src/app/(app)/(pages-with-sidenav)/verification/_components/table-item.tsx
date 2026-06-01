"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, ImageIcon, MoreVertical, ShieldCheck, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { getPublishType } from "@/constants/general";
import Link from "next/link";
import { TPostDoc } from "@/types/db";
import { toast } from "sonner";
import { tryCatch } from "@/lib/utils";
import { hrefs } from "@/constants/hrefs";

export default function TableItem({
  post,
  onDelete,
  onUpdate,
}: {
  post: TPostDoc;
  onDelete: (id: string) => void;
  onUpdate: (updatedPost: TPostDoc) => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const [res, err] = await tryCatch(
      hrefs.api.post.delete.action(hrefs.api.post.delete.url(post._id))
    );
    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
    if (err) {
      toast.error("Failed to delete post");
      return;
    }
    toast.success("Post deleted successfully");
    onDelete(post._id);
  };

  const handleVerifyToggle = async () => {
    setIsVerifying(true);
    const newStatus = !post.verifiedAt;
    const [res, err] = await tryCatch(
      hrefs.api.post.verify.action(hrefs.api.post.verify.url(post._id), {
        status: newStatus,
      })
    );
    setIsVerifying(false);
    
    if (err) {
      toast.error("Failed to update verification status");
      return;
    }
    
    toast.success("Verification status updated");
    // Update local state without fetching again
    onUpdate({ ...post, verifiedAt: newStatus ? new Date() : null });
  };

  return (
    <>
      <TableRow className="hover:bg-muted/50">
        <TableCell className="sm:p-2 px-0 w-fit">
          <div className="lg:w-[180px] w-[80px] aspect-video grid place-items-center">
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                height={150}
                width={150}
                className="size-full overflow-hidden object-cover"
                alt="gallery-image"
            />
            ) : (
              <div className="size-full grid place-content-center border bg-accent/50">
                <ImageIcon />
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="font-medium">{post.title}</TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge variant="outline">
            {getPublishType(post.publishingOption.publishType)?.label}
          </Badge>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          {post.verifiedAt ? (
            <Badge variant="outline" className="border-emerald-500 text-emerald-500 bg-emerald-500/10">
              Verified
            </Badge>
          ) : (
            <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10">
              Pending
            </Badge>
          )}
        </TableCell>
        <TableCell className="">
          {post.details.pricing.isPaid
            ? `$${post.details.pricing.price}`
            : `Free`}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {post.categories.tags.join(", ")}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {format(post.createdAt, "PPP")}
        </TableCell>
        <TableCell className="px-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                className="rounded-full"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="[&_svg]:size-4 [&_svg]:mr-2"
            >
              <Link href={hrefs.post(post._id)}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye /> <span>View Details</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem 
                onClick={handleVerifyToggle}
                disabled={isVerifying}
                className="cursor-pointer text-emerald-600 focus:text-emerald-600"
              >
                <ShieldCheck /> <span>{post.verifiedAt ? "Unverify" : "Verify"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 /> <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
