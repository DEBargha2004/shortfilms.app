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
import {
  genreCreateSchema,
  defaultValues,
  TGenreCreateSchema,
} from "@/schema/genre-create";
import GenreCreateForm from "@/components/custom/forms/genre-create";
import { hrefs } from "@/constants/hrefs";

export default function Page() {
  const form = useForm<TGenreCreateSchema>({
    resolver: zodResolver(genreCreateSchema),
    defaultValues: defaultValues(),
  });

  const { push } = useRouter();

  const onSubmit = async (data: TGenreCreateSchema) => {
    const [res, err] = await tryCatch(
      hrefs.api.genre.create.action(hrefs.api.genre.create.url, data),
    );
    if (err) return toast.error(err.message);

    toast.success("Genre created successfully");
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
                <BreadcrumbPage>Create</BreadcrumbPage>
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
