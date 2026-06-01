"use client";

import {
  defaultValues,
  postCreateSchema,
  TPostCreateSchema,
} from "@/schema/post-create";
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
import PostCreateForm from "@/components/custom/forms/post-create";
import { tryCatch } from "@/lib/utils";
import { hrefs } from "@/constants/hrefs";
import { toast } from "sonner";
import useFileUpload from "@/hooks/use-file-upload";
import { useRouter } from "next/navigation";
import useUploadPost from "@/hooks/use-upload-post";
import { use, useEffect } from "react";
import { usePostStore } from "@/store/post-store";

async function getGenres() {
  const [res, err] = await tryCatch(hrefs.api.genre.getAll.invoke());
  if (err) throw new Error(err.message);
  return res?.data?.data;
}
async function getTechniques() {
  const [res, err] = await tryCatch(hrefs.api.technique.getAll.invoke());
  if (err) throw new Error(err.message);
  return res?.data?.data;
}

export default function Page() {
  const form = useForm<TPostCreateSchema>({
    resolver: zodResolver(postCreateSchema) as any,
    defaultValues: defaultValues(),
  });

  const setGenres = usePostStore((state) => state.setGenres);
  const setTechniques = usePostStore((state) => state.setTechniques);

  const { upload } = useFileUpload({
    requestPresigner: hrefs.api.presignedUrl.post.thumbnail.invoke,
  });
  const { push } = useRouter();

  const { upload: uploadForm } = useUploadPost({
    formUploader(data) {
      return hrefs.api.post.create.action(hrefs.api.post.create.url, data);
    },
  });

  const onSubmit = async (data: TPostCreateSchema) => {
    const [res, err] = await tryCatch(uploadForm(data));
    if (err) toast.error(err.message);
    toast.success(res!.data.message);
    return push(hrefs.content);
  };

  useEffect(() => {
    getGenres()
      .then((res) => {
        setGenres(res);
      })
      .catch((err) => toast.error((err as Error).message));
    getTechniques()
      .then((res) => {
        setTechniques(res);
      })
      .catch((err) => toast.error((err as Error).message));
  }, []);

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
                  <Link href="#">Post</Link>
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
          <div className="grid flex-1 auto-rows-max gap-4 @container">
            <PostCreateForm form={form} onSubmit={onSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}
