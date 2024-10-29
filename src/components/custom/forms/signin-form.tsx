import { TSignIn } from "@/schema/sign-in";
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
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./style.css";

export default function SigninForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<TSignIn>>;
  onSubmit: (e: TSignIn) => void;
}) {
  const [visibility, setVisibility] = useState({
    password: false,
  });
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
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
              <Link
                href={
                  "/a/forget-password?" +
                  new URLSearchParams({ callback: callback ?? "" }).toString()
                }
                className="inline-block text-sm mt-3 w-full"
              >
                <p className="text-right">Forgot password?</p>
              </Link>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full space-x-2">
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>Sign In</span>
        </Button>
        <Link
          href={
            "/a/sign-up?" +
            new URLSearchParams({ callback: callback ?? "" }).toString()
          }
          className="text-sm inline-block w-full"
        >
          Don&apos;t have an account?
        </Link>
      </form>
    </Form>
  );
}
