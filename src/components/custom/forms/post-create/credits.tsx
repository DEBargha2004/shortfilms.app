import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";

const publisherTypes: string[] = ["School", "Studio", "Softwares"];

export default function Credits({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <FormField
        control={form.control}
        name="publisherType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publisher Type</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="Publisher Type" />
                </SelectTrigger>
                <SelectContent>
                  {publisherTypes.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
        name="members"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Members</FormLabel>
            <FormControl>
              <MultiSelect
                values={field.value}
                onValueChange={field.onChange}
                options={[]}
                placeholder="Select options"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
