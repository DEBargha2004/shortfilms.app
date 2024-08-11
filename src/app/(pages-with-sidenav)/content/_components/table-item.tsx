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
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const info_options: (Option & { Icon: Icon })[] = [
  { label: "Edit", value: "edit", Icon: Edit },
  { label: "View", value: "view", Icon: Eye },
  { label: "Delete", value: "delete", Icon: Trash2 },
];

export default function TableItem() {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="sm:p-2 px-0 w-fit">
        <div className="lg:h-[150px] lg:w-[150px] h-[80px] w-[80px] grid place-items-center">
          <Image
            src="https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
            height={150}
            width={150}
            className="w-full aspect-video object-cover"
            alt="gallery-image"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
      <TableCell className="max-w-[150px] md:table-cell hidden">
        <Badge variant="outline">Draft</Badge>
      </TableCell>
      <TableCell className="">$29</TableCell>
      <TableCell className="hidden md:table-cell">
        Artwork, Shortfilm,
      </TableCell>
      <TableCell className="hidden md:table-cell">
        2023-07-12 10:42 AM
      </TableCell>
      <TableCell className="px-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              className="px-0"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {info_options.map((item) => (
              <DropdownMenuItem key={item.value}>
                <item.Icon className="mr-2 h-4" />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
