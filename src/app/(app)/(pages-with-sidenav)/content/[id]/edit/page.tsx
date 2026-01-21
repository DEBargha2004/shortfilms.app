"use client";

import PostCreateForm from "@/components/custom/forms/post-create";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import {
  defaultValues,
  postCreateSchema,
  TPostCreateSchema,
} from "@/schema/post-create";
import { DefaultAppError } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TPostDoc } from "@/../../backend/src/modules/post/entities/post.entity";
import useUploadPost from "@/hooks/use-upload-post";
import useFileUpload from "@/hooks/use-file-upload";

export default function Page() {
  const params = useParams<{ id: string }>();
  const form = useForm<TPostCreateSchema>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: defaultValues(),
  });

  const { upload } = useUploadPost({
    formUploader(data) {
      return hrefs.api.post.update.action(
        hrefs.api.post.update.url(params.id),
        data
      );
    },
  });
  const { push } = useRouter();

  const onSubmit = async (formdata: TPostCreateSchema) => {
    const [res, err] = await tryCatch(upload(formdata));
    if (err) return toast.error(err.message);

    toast.success(res?.data.message);
    return push(hrefs.content);
  };

  useEffect(() => {
    (async function () {
      const [res, err] = await tryCatch<
        AxiosResponse<TPostDoc>,
        AxiosError<DefaultAppError>
      >(
        hrefs.api.post.getPostOfUser.action(
          hrefs.api.post.getPostOfUser.url(params.id)
        )
      );
      if (err) {
        toast.error(err.response?.data.error, {
          description: err.response?.data.message,
        });
      }

      form.reset({
        ...form.getValues(),
        title: res?.data.title,
        description: res?.data.description,
        video: res?.data.video,
        trailer: res?.data.trailer,
        categories: res?.data.categories,
        credits: res?.data.credits,
        thumbnail: res?.data.thumbnail,
        playlist: res?.data.playlist,
        press: res?.data.press,
        publishingOption: res?.data.publishingOption,
        schedulingOption: res?.data.schedulingOption,
        details: res?.data.details,
      });
    })();
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
