import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TForgetPasswordSetPassword } from "@/schema/forget-password";
import { useForm } from "react-hook-form";
import "./style.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function ForgetPasswordSetPasswordForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<TForgetPasswordSetPassword>>;
  onSubmit: (e: TForgetPasswordSetPassword) => void;
}) {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={visibility.password ? "text" : "password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 [&>svg]:h-5 [&>svg]:w-5 p-2 h-8",
                      "hover:bg-accent/50",
                    )}
                    onClick={() =>
                      setVisibility((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    {visibility.password ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={visibility.confirmPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 [&>svg]:h-5 [&>svg]:w-5 p-2 h-8",
                      "hover:bg-accent/50",
                    )}
                    onClick={() =>
                      setVisibility((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    {visibility.confirmPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full space-x-2">
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
}
