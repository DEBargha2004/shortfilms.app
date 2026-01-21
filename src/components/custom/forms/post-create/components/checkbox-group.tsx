import { Checkbox } from "@/components/ui/checkbox";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TPostCreateSchema } from "@/schema/post-create";
import { FieldPath, useFormContext } from "react-hook-form";

export default function CheckboxGroup({
  title,
  description,
  list,
  selected,
  maxSelectable,
  onChange,
  name,
}: {
  title: string;
  description: string;
  list: string[];
  selected: string[];
  maxSelectable: number;
  onChange: (e: string) => void;
  name: FieldPath<TPostCreateSchema>;
}) {
  const { control } = useFormContext();
  return (
    <section>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <h1 className="text-lg">{title}</h1>
            </FormLabel>
            <FormDescription className="text-sm font-light">
              {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid @2xl:grid-cols-4 grid-cols-3 gap-5 gap-y-8 mt-5">
        {list.map((t) => (
          <div className="flex justify-start items-center gap-3" key={t}>
            <Checkbox
              className="size-5"
              disabled={
                !(selected.length < maxSelectable || selected.includes(t))
              }
              id={t}
              onCheckedChange={(e) => onChange(t)}
            />
            <Label htmlFor={t} className="">
              {t}
            </Label>
          </div>
        ))}
      </div>
    </section>
  );
}
