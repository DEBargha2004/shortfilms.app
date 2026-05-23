"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import { tryCatch } from "@/lib/utils";
import { hrefs } from "@/constants/hrefs";

export default function TableItem({
  technique,
  onRefresh,
}: {
  technique: any;
  onRefresh?: () => void;
}) {
  const handleDelete = async () => {
    const id = technique._id || technique.id;
    const [res, err] = await tryCatch(
      hrefs.api.technique.delete.action(hrefs.api.technique.delete.url(id)),
    );
    if (err) return toast.error(err.message);
    toast.success("Technique deleted successfully");
    if (onRefresh) onRefresh();
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{technique.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {format(new Date(technique.createdAt || Date.now()), "PPP")}
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
            <Link href={`/techniques/${technique._id || technique.id}`}>
              <DropdownMenuItem>
                <Pencil /> <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Eye /> <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 /> <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
