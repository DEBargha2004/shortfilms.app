import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxGroup({
  title,
  description,
  list,
  selected,
  maxSelectable,
  onChange,
}: {
  title: string;
  description: string;
  list: string[];
  selected: string[];
  maxSelectable: number;
  onChange: (e: string) => void;
}) {
  return (
    <section>
      <h1 className="text-lg">{title}</h1>
      <p className="text-sm font-light">{description}</p>
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
