import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import SafeRemove from "../../safe-remove";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Honors({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <section className="flex justify-start items-end gap-4">
        <div className="w-1/2 space-y-1">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            placeholder="Search festivals and awards..."
          />
        </div>
        <div className="w-1/2 space-y-1">
          <Label htmlFor="">Award</Label>
          <Input id="award" placeholder='"Audience Award"...' />
        </div>
        <Button type="button" className="w-24 font-semibold">
          ADD
        </Button>
      </section>
      <section className="grid gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-start items-center gap-6">
            <section className="h-16 aspect-square rounded-lg bg-accent"></section>
            <section className="flex flex-col items-start justify-center">
              <h1 className="text-lg">San Francisco Music Festival</h1>
              <h2 className="text-muted-foreground">Best Music Director</h2>
            </section>
            <SafeRemove action={() => {}}>
              <Button
                variant={"ghost"}
                type="button"
                size={"icon"}
                className="ml-auto"
              >
                <X size={16} />
              </Button>
            </SafeRemove>
          </div>
        ))}
      </section>
    </>
  );
}
