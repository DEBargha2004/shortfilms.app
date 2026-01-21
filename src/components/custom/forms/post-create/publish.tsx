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
import { TPostCreateSchema } from "@/schema/post-create";
import { useFormContext, useWatch } from "react-hook-form";
import IconInput from "../../icon-input";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export default function PublishOptions() {
  const { control, setValue } = useFormContext<TPostCreateSchema>();
  const schedulingOption = useWatch({
    control: control,
    name: "schedulingOption",
  });
  const publishType = useWatch({
    control: control,
    name: "publishingOption.publishType",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (schedulingOption?.isScheduled) {
      setValue("schedulingOption.publishDate", new Date());
    } else {
      setValue("schedulingOption.publishDate", undefined);
    }
  }, [schedulingOption?.isScheduled]);

  return (
    <>
      <FormField
        control={control}
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
      {publishType === privatePublishing.value && (
        <FormField
          control={control}
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control}
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
          control={control}
          name="schedulingOption.publishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={
                    field.value
                      ? format(field.value, "yyyy-MM-dd'T'HH:mm:ss")
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control}
        name="publishingOption.copyrightPermission"
        render={({ field }) => (
          <FormItem className={cn("space-y-0", "flex flex-col gap-4")}>
            <div className="flex flex-row-reverse gap-4 justify-end items-center">
              <FormLabel>Copyright Permission</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <FormMessage className="" />
          </FormItem>
        )}
      />
    </>
  );
}
