import { TPostCreateSchema } from "@/schema/post-create";
import CheckboxGroup from "./components/checkbox-group";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { usePostStore } from "@/store/post-store";

const MAX_SELECTABLE_GENRES = 2;
const MAX_SELECTABLE_TECHNIQUES = 3;

export default function Categories() {
  const topicInputRef = useRef<HTMLInputElement>(null);
  const { getValues, setValue, control } = useFormContext<TPostCreateSchema>();

  const { genres, techniques } = usePostStore();

  const selectedGenres = useWatch({
    control: control,
    name: "categories.genres",
  });
  const selectedTechniques = useWatch({
    control: control,
    name: "categories.techniques",
  });
  const selectedTags = useWatch({
    control: control,
    name: "categories.tags",
  });

  const handleToggle = (
    key: "categories.genres" | "categories.techniques",
    value: string
  ) => {
    if (getValues(key).includes(value)) {
      setValue(
        key,
        getValues(key).filter((v) => v !== value)
      );
    } else {
      setValue(key, getValues(key).concat(value));
    }
  };

  const handleAddTopic = () => {
    const topicTemp = topicInputRef.current?.value;

    if (!topicTemp) return;
    setValue("categories.tags", [topicTemp, ...getValues("categories.tags")]);

    topicInputRef.current.value = "";
  };

  const handleRemoveTopic = (topic: string) => {
    setValue(
      "categories.tags",
      getValues("categories.tags").filter((t) => t !== topic)
    );
  };
  return (
    <>
      <CheckboxGroup
        title="GENRE"
        name="categories.genres"
        description={`Select up to ${MAX_SELECTABLE_GENRES}`}
        list={genres?.map((g) => g.name) || []}
        selected={selectedGenres}
        maxSelectable={MAX_SELECTABLE_GENRES}
        onChange={(e) => handleToggle("categories.genres", e)}
      />
      <CheckboxGroup
        title="TECHNIQUE"
        name="categories.techniques"
        description={`Select up to ${MAX_SELECTABLE_TECHNIQUES}`}
        list={techniques?.map((t) => t.name) || []}
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
