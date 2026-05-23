"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { tryCatch } from "@/lib/utils";
import { use, useEffect } from "react";
import { genreCreateSchema, TGenreCreateSchema } from "@/schema/genre-create";
import GenreCreateForm from "@/components/custom/forms/genre-create";
import { hrefs } from "@/constants/hrefs";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const form = useForm<TGenreCreateSchema>({
    resolver: zodResolver(genreCreateSchema),
    defaultValues: { name: "" },
  });

  const { push } = useRouter();

  useEffect(() => {
    (async function () {
      const [res, err] = await tryCatch(
        hrefs.api.genre.getOne.action(hrefs.api.genre.getOne.url(id)),
      );
      if (err) {
        toast.error(err.message);
        return push(hrefs.genres);
      }
      if (res?.data?.data) {
        form.reset({ name: res.data.data.name });
      }
    })();
  }, [id]);

  const onSubmit = async (data: TGenreCreateSchema) => {
    const [res, err] = await tryCatch(
      hrefs.api.genre.update.action(hrefs.api.genre.update.url(id), data),
    );
    if (err) return toast.error(err.message);

    toast.success("Genre updated successfully");
    return push(hrefs.genres);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-col sm:gap-4 sm:py-4">
        <header
          className="sm:flex hidden z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
        sm:border-0 sm:bg-darkAccent sm:px-6"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={hrefs.genres}>Genres</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid flex-1 auto-rows-max gap-4 @container max-w-2xl">
            <GenreCreateForm form={form} onSubmit={onSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}
