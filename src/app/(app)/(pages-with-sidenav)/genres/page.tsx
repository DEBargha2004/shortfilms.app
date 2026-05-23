"use client";

import Link from "next/link";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import TableItem from "./_components/table-item";
import { tryCatch } from "@/lib/utils";
import { toast } from "sonner";
import { hrefs } from "@/constants/hrefs";

export default function Genres() {
  const [genres, setGenres] = useState<any[]>([]);

  const fetchGenres = async () => {
    const [res, err] = await tryCatch(
      hrefs.api.genre.getAll.action(hrefs.api.genre.getAll.url),
    );
    if (err) return toast.error(err.message);
    setGenres(res?.data?.data || []);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto scroller">
      <div className="flex flex-col sm:gap-4 p-1">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 pt-4">
          <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
            <div className="flex gap-2 items-center justify-start sm:w-fit w-full">
              {/* Add tabs here if needed */}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <Link href={"/genres/create"} className="inline">
                <Button
                  size="sm"
                  variant={"success"}
                  className="h-8 gap-1 rounded-sm"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Genre
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
              </div>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0" className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Genres</CardTitle>
              <CardDescription>Manage your content genres.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created on
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {genres.map((c) => (
                    <TableItem
                      key={c.id}
                      genre={c}
                      onRefresh={fetchGenres}
                    />
                  ))}
                  {genres.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center h-24 text-muted-foreground"
                      >
                        No genres found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{genres.length}</strong> of{" "}
                <strong>{genres.length}</strong> Genres
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
