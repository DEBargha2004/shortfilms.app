import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TSigninSchema } from "@/schema/signin";
import { TFormDefaultProps } from "@/types/form-props";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignInForm({
  form,
  onSubmit,
}: TFormDefaultProps<TSigninSchema>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center">
                <span>Password</span>
                <Link href={"/auth/forget-password"}>Forget Password?</Link>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
            <span>Sign in</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
