import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TForgetPasswordSchema } from "@/schema/forget-password";
import { TFormDefaultProps } from "@/types/form-props";
import { Loader2, Mail } from "lucide-react";
import IconInput from "../icon-input";

export default function ForgetPassword({
  form,
  onSubmit,
}: TFormDefaultProps<TForgetPasswordSchema>) {
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput
                  endIcon={<Mail size={20} className="text-muted-foreground" />}
                  type="email"
                  {...field}
                  placeholder="Email"
                  className="[&>input]:pr-8"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Get OTP</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
