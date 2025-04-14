import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectItemProps,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { premiereStatus } from "@/constants/general";
import { languages } from "@/constants/lang";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { getCodeList, getName } from "country-list";

const tags: MultiSelectItemProps[] = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];
const playlists: MultiSelectItemProps[] = [
  "Playlist 1",
  "Playlist 2",
  "Playlist 3",
  "Playlist 4",
];

export default function Metadata({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <FormField
        control={form.control}
        name="details.duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration (in minites)</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
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
        control={form.control}
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
      <FormField
        control={form.control}
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
        control={form.control}
        name="details.completionDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Completion Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="playlist"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Playlist</FormLabel>
            <FormControl>
              <MultiSelect
                onValueChange={field.onChange}
                options={playlists}
                values={field.value}
                placeholder="Select Playlists"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <MultiSelect
                options={tags}
                onValueChange={field.onChange}
                values={field.value}
                placeholder="Select Tags"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="details.isPaid"
        render={({ field }) => (
          <FormItem className="flex justify-start items-center gap-4 space-y-0">
            <FormLabel>Paid</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
