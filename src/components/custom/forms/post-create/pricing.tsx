import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { TPostCreateSchema } from "@/schema/post-create";

import IconInput from "../../icon-input";
import { IndianRupee } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Pricing() {
  const { control, setValue } = useFormContext<TPostCreateSchema>();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setValue("details.pricing.isPaid", isPaid);
  }, [isPaid]);
  return (
    <>
      <FormField
        control={control}
        name="details.pricing.isPaid"
        render={({ field }) => (
          <FormItem className="flex justify-start items-center gap-4 space-y-0">
            <FormLabel>Paid</FormLabel>
            <FormControl>
              <Switch checked={isPaid} onCheckedChange={setIsPaid} />
            </FormControl>
          </FormItem>
        )}
      />
      {isPaid && (
        <FormField
          control={control}
          name="details.pricing.price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <IconInput
                  startIcon={<IndianRupee size={20} />}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
