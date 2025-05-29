import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { creditRoles } from "@/constants/general";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { Plus } from "lucide-react";

const publisherTypes: string[] = ["School", "Studio", "Softwares"];

export default function Credits({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  return (
    <>
      <section className="flex justify-start items-end gap-4">
        <FormField
          control={form.control}
          name="publishingOption.publisher.name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publishingOption.publisher.role"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {creditRoles.map((grp) => (
                      <SelectGroup key={grp.group_name}>
                        <SelectLabel className="pl-4">
                          {grp.group_name}
                        </SelectLabel>
                        {grp.elements.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" size={"icon"}>
          <Plus />
        </Button>
      </section>
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
