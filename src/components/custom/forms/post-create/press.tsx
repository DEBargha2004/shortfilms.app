import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import SafeRemove from "../../safe-remove";
import { X } from "lucide-react";

export default function Press({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <div className="space-y-1">
        <Label>Press Link</Label>
        <div className="flex justify-between items-center gap-2">
          <Input placeholder="https://" />
          <Button variant={"secondary"} type="button">
            Add
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-start items-center gap-6">
            <section className="h-28 aspect-square border shrink-0">
              {/* <img src={""} /> */}
            </section>
            <section className="w-4/5 flex flex-col justify-center items-start gap-1">
              <h3 className="text-sm text-muted-foreground">youtu.be</h3>
              <h1 className="font-semibold text-lg">
                The Final Copy of Ilon Specht in Vimeo Staff Picks
              </h1>
              <h2 className="line-clamp-2 text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
                nostrum consequatur inventore doloribus ipsam expedita enim in
                aperiam dolore. Amet laudantium ex, quo alias voluptates hic.
                Voluptates modi sit magni.
              </h2>
            </section>
            <SafeRemove action={() => {}}>
              <Button
                type="button"
                variant={"light_ghost"}
                size={"icon"}
                className="ml-auto"
              >
                <X size={16} />
              </Button>
            </SafeRemove>
          </div>
        ))}
      </div>
    </>
  );
}
