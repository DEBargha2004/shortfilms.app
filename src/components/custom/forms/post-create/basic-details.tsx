import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Control } from "react-hook-form";

export default function BasicDetails({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} rows={6} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
