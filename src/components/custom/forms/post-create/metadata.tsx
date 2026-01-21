import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelectItemProps } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ageRating, premiereStatus } from "@/constants/general";
import { languages } from "@/constants/lang";
import { TPostCreateSchema } from "@/schema/post-create";
import { getCodeList, getName } from "country-list";
import { useFormContext, useWatch } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Playlist from "./playlist";
import Pricing from "./pricing";
import { useRef } from "react";

const tags: MultiSelectItemProps[] = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];

export default function Metadata() {
  const { control, setValue, getValues } = useFormContext<TPostCreateSchema>();
  const softwareInputRef = useRef<HTMLInputElement>(null);
  const softwaresUsed = useWatch({ control, name: "details.softwareUsed" });

  const handleAddSoftware = () => {
    const softwareInput = softwareInputRef.current;
    if (!softwareInput) return;

    const inp = softwareInput?.value ?? "";
    setValue("details.softwareUsed", [
      ...getValues("details.softwareUsed"),
      inp,
    ]);
    softwareInput.value = "";
  };

  const handleRemoveSoftware = (id: string) => {
    setValue(
      "details.softwareUsed",
      getValues("details.softwareUsed").filter((s) => s !== id)
    );
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="details.duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in minites)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value ?? ""))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="details.completionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={format(field.value, "yyyy-MM-dd")}
                  onChange={(e) => {
                    console.log(e.target.value);
                    field.onChange(new Date(e.target.value ?? ""));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="details.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(getCodeList()).map((code) => (
                      <SelectItem key={code} value={code}>
                        {getName(code)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="details.language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="details.premiereStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Premiere Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {premiereStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="details.ageRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Rating</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRating.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Playlist />
      </section>
      <section className="space-y-3">
        <FormField
          control={control}
          name="details.softwareUsed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Software Used</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input ref={softwareInputRef} />
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="gap-3"
                    onClick={handleAddSoftware}
                  >
                    <Plus />
                    <span>Add</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2 pt-3">
          {softwaresUsed.map((t) => (
            <Button
              className="p-2 h-8 gap-2"
              type="button"
              onClick={() => handleRemoveSoftware(t)}
              key={t}
            >
              {t}
              <X size={16} />
            </Button>
          ))}
        </div>
      </section>

      <Pricing />
    </>
  );
}
