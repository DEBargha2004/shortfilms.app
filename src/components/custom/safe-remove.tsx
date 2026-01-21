"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function SafeRemove({
  action,
  children,
  title,
  description,
  deleteLabel,
}: {
  action: () => void | Promise<void>;
  title?: string;
  description?: string;
  deleteLabel?: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setDialogOpen] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    await action();
    setLoading(false);
    setDialogOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Are you sure want to remove?"}</DialogTitle>
          <DialogDescription>
            {description ??
              "This is an irreversible action and cannot be undone"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={"destructive"}
            disabled={loading}
            onClick={handleAction}
          >
            {loading && <Loader2 className="animate-spin" />}
            <span>{deleteLabel ?? "Remove"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
