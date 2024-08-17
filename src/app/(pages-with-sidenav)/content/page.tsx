"use client";

import Link from "next/link";
import {
  Edit,
  Eye,
  ListFilter,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { type Icon } from "@/types/icon";
import TableItem from "./_components/table-item";

type FieldType = { label: string; value: string };

const filter: FieldType[] = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Oldest", value: "oldest" },
];

export default function Content() {
  const [selectedFilter, setSelectedFilter] = useState(filter[0].value);
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto scroller">
      <div className="flex flex-col sm:gap-4 sm:p-0 p-1">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex sm:flex-row flex-col items-center justify-between gap-2 ">
              <div className="flex gap-2 items-center justify-start sm:w-fit w-full">
                <TabsList className="bg-card">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="public">Public</TabsTrigger>
                  <TabsTrigger value="private">Private</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                <Link href={"/content/create"} className=" inline">
                  <Button
                    size="sm"
                    variant={"success"}
                    className="h-8 gap-1 rounded-sm"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Post
                    </span>
                  </Button>
                </Link>

                <div className="relative md:grow-0 md:w-fit w-[200px] flex justify-between items-center gap-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] h-8"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 bg-transparent"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {filter.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.value}
                          onClick={() => setSelectedFilter(item.value)}
                          checked={selectedFilter === item.value}
                          className=""
                        >
                          {item.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Content</CardTitle>
                  <CardDescription>
                    Manage your posts and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="w-[100px] table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          View
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created on
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                        <TableItem key={i} />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> Posts
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
