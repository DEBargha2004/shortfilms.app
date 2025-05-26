import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import CheckboxGroup from "./components/checkbox-group";
import { ageRating, genres, techniques } from "@/constants/general";
import { useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const MAX_SELECTABLE_GENRES = 2;
const MAX_SELECTABLE_TECHNIQUES = 3;

export default function Categories({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const topicInputRef = useRef<HTMLInputElement>(null);

  const selectedGenres = useWatch({
    control: form.control,
    name: "categories.genres",
  });
  const selectedTechniques = useWatch({
    control: form.control,
    name: "categories.techniques",
  });
  const selectedTags = useWatch({
    control: form.control,
    name: "categories.tags",
  });

  const handleToggle = (
    key: "categories.genres" | "categories.techniques",
    value: string
  ) => {
    if (form.getValues(key).includes(value)) {
      form.setValue(
        key,
        form.getValues(key).filter((v) => v !== value)
      );
    } else {
      form.setValue(key, form.getValues(key).concat(value));
    }
  };

  const handleAddTopic = () => {
    const topicTemp = topicInputRef.current?.value;

    if (!topicTemp) return;
    form.setValue("categories.tags", [
      topicTemp,
      ...form.getValues("categories.tags"),
    ]);

    topicInputRef.current.value = "";
  };

  const handleRemoveTopic = (topic: string) => {
    form.setValue(
      "categories.tags",
      form.getValues("categories.tags").filter((t) => t !== topic)
    );
  };
  return (
    <>
      <CheckboxGroup
        title="GENRE"
        description={`Select up to ${MAX_SELECTABLE_GENRES}`}
        list={genres}
        selected={selectedGenres}
        maxSelectable={MAX_SELECTABLE_GENRES}
        onChange={(e) => handleToggle("categories.genres", e)}
      />
      <CheckboxGroup
        title="TECHNIQUE"
        description={`Select up to ${MAX_SELECTABLE_TECHNIQUES}`}
        list={techniques}
        selected={selectedTechniques}
        maxSelectable={MAX_SELECTABLE_TECHNIQUES}
        onChange={(e) => handleToggle("categories.techniques", e)}
      />

      <section className="space-y-3">
        <FormLabel>Tags</FormLabel>
        <div className="flex gap-2">
          <Input ref={topicInputRef} />
          <Button
            type="button"
            variant={"secondary"}
            className="gap-3"
            onClick={handleAddTopic}
          >
            <Plus />
            <span>Add</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {selectedTags.map((t) => (
            <Button
              className="p-2 h-8 gap-2"
              type="button"
              onClick={() => handleRemoveTopic(t)}
              key={t}
            >
              {t}
              <X size={16} />
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
