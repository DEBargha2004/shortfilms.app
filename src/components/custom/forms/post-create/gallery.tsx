"use client";

import { Button } from "@/components/ui/button";
import useFileReader from "@/hooks/use-file-reader";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";
import SafeRemove from "../../safe-remove";

export default function Gallery({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const [imagesData, setImagesData] = useState<{ id: string; url: string }[]>(
    []
  );
  const { read } = useFileReader();
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop(acceptedFiles, fileRejections, event) {
      acceptedFiles.forEach((file) => {
        read(file).then((res) => {
          setImagesData((prev) => [...prev, { id: nanoid(), url: res }]);
        });
      });
    },
  });

  const handleDeleteMedia = (id: string) => {
    setImagesData((prev) => prev.filter((image) => image.id !== id));
  };
  return (
    <div className="grid @4xl:grid-cols-5 @3xl:grid-cols-4 @xl:grid-cols-3 @md:grid-cols-2 gap-3">
      {imagesData.map((image, idx) => (
        <MediaWrapper
          key={image.id}
          className="hover:opacity-80 transition-all relative group"
        >
          <SafeRemove action={() => handleDeleteMedia(image.id)}>
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              className="rounded-full shrink-0 absolute top-2 right-2 size-10 hidden group-hover:flex"
            >
              <Trash2 size={18} />
            </Button>
          </SafeRemove>
          <Image
            src={image.url}
            height={900}
            width={1600}
            className="w-full h-full object-cover"
            alt="Gallery Image"
          />
        </MediaWrapper>
      ))}
      <input {...getInputProps()} />
      <MediaWrapper
        className={cn(
          "hover:bg-accent/20 transition-all group",
          "flex flex-col items-center justify-center gap-2 border border-dashed"
        )}
      >
        <Button
          type="button"
          variant={"secondary"}
          size={"icon"}
          className={cn(
            "rounded-full shrink-0 w-fit transition-all",
            "translate-y-4 group-hover:translate-y-0"
          )}
          {...getRootProps()}
        >
          <Plus size={20} />
        </Button>
        <p
          className={cn(
            "text-sm opacity-0 -translate-y-4 transition-all",
            "group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          Select Images
        </p>
      </MediaWrapper>
    </div>
  );
}

function MediaWrapper({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full aspect-video rounded overflow-hidden", className)}
      {...props}
    >
      {children}
    </section>
  );
}
