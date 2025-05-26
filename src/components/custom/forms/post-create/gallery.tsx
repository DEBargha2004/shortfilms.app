"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Plus } from "lucide-react";

export default function Gallery({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <div className="grid @4xl:grid-cols-5 @3xl:grid-cols-4 @xl:grid-cols-3 @md:grid-cols-2 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <section
          key={i}
          className="w-full aspect-square rounded bg-accent"
        ></section>
      ))}
      <section
        className={cn(
          "hover:bg-accent/20 transition-all text-center group",
          "flex flex-col items-center justify-center gap-2 aspect-square rounded border border-dashed"
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
      </section>
    </div>
  );
}
