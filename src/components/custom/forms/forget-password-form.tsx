import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TForgetPassword } from "@/schema/forget-password";
import { useForm } from "react-hook-form";
import "./style.css";
import { Loader2 } from "lucide-react";

export default function ForgetPasswordForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<TForgetPassword>>;
  onSubmit: (e: TForgetPassword) => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full space-x-2">
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>Get Email</span>
        </Button>
      </form>
    </Form>
  );
}
