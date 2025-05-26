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
import { privatePublishing, publishingTypes } from "@/constants/general";
import { PostCreateSchema } from "@/schema/post-create";
import { TFormChildrenDefaultProps } from "@/types/form-props";
import { useWatch } from "react-hook-form";
import IconInput from "../../icon-input";
import { useEffect, useState } from "react";
import { CalendarIcon, EyeIcon, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export default function PublishOptions({
  form,
}: TFormChildrenDefaultProps<PostCreateSchema>) {
  const { schedulingOption, publishingOption } = useWatch({
    control: form.control,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (schedulingOption?.isScheduled) {
      const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      form.setValue("schedulingOption.publishDate", formattedDate);
    } else {
      form.setValue("schedulingOption.publishDate", "");
    }
  }, [schedulingOption?.isScheduled]);

  return (
    <>
      <FormField
        control={form.control}
        name="publishingOption.publishType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publish Type</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {publishingTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {publishingOption?.publishType === privatePublishing.value && (
        <FormField
          control={form.control}
          name="publishingOption.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <IconInput
                  type={showPassword ? "text" : "password"}
                  {...field}
                  endIcon={
                    <div onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff /> : <EyeIcon />}
                    </div>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="schedulingOption.isScheduled"
        render={({ field }) => (
          <FormItem className="flex items-center gap-4 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Schedule</FormLabel>
          </FormItem>
        )}
      />
      {schedulingOption?.isScheduled && (
        <FormField
          control={form.control}
          name="schedulingOption.publishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="publishingOption.copyrightPermission"
        render={({ field }) => (
          <FormItem
            className={cn(
              "space-y-0",
              "flex flex-row-reverse items-center justify-end gap-4"
            )}
          >
            <FormLabel>Copyright Permission</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
