import { TBasicSignup } from "@/schema/sign-up";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { useSearchParams } from "next/navigation";
import "./style.css";

export default function BasicSignupForm({
  form,
  handleSubmit,
}: {
  form: ReturnType<typeof useForm<TBasicSignup>>;
  handleSubmit: (e: TBasicSignup) => void;
}) {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
        <FormField
          control={form.control}
          name="passwords.password"
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
          name="passwords.confirmPassword"
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

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Sign Up</span>
        </Button>

        <Link
          href={
            "/a/sign-in?" +
            new URLSearchParams({ callback: callback ?? "" }).toString()
          }
          className="text-sm inline-block w-full"
        >
          Already have an account?
        </Link>
      </form>
    </Form>
  );
}
