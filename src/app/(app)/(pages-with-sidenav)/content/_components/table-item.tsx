"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Option } from "@/types/option";
import type { Icon } from "@/types/icon";
import {
  Edit,
  Eye,
  ImageIcon,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { getPublishType } from "@/constants/general";
import Link from "next/link";
import { TPostDoc } from "@/../../backend/src/modules/post/entities/post.entity";

const info_options: (Option & { Icon: Icon })[] = [
  { label: "View", value: "view", Icon: Eye },
  { label: "Delete", value: "delete", Icon: Trash2 },
];

export default function TableItem({ post }: { post: TPostDoc }) {
  return (
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
      <TableCell className="max-w-[150px] md:table-cell hidden">
        <Badge variant="outline">
          {getPublishType(post.publishingOption.publishType)?.label}
        </Badge>
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
            <Link href={`/content/${post._id}/edit`}>
              <DropdownMenuItem>
                <Pencil /> <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            {info_options.map((item) => (
              <DropdownMenuItem key={item.value}>
                <item.Icon />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
