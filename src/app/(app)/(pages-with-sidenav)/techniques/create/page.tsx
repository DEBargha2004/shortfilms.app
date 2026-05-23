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
  techniqueCreateSchema,
  defaultValues,
  TTechniqueCreateSchema,
} from "@/schema/technique-create";
import TechniqueCreateForm from "@/components/custom/forms/technique-create";
import { hrefs } from "@/constants/hrefs";

export default function Page() {
  const form = useForm<TTechniqueCreateSchema>({
    resolver: zodResolver(techniqueCreateSchema),
    defaultValues: defaultValues(),
  });

  const { push } = useRouter();

  const onSubmit = async (data: TTechniqueCreateSchema) => {
    const [res, err] = await tryCatch(
      hrefs.api.technique.create.action(hrefs.api.technique.create.url, data),
    );
    if (err) return toast.error(err.message);

    toast.success("Technique created successfully");
    return push(hrefs.techniques);
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
                  <Link href={hrefs.techniques}>Techniques</Link>
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
            <TechniqueCreateForm form={form} onSubmit={onSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}
