"use client";

import SignInForm from "@/components/custom/forms/signin";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { hrefs } from "@/constants/hrefs";
import { useAuth } from "@/provider/auth-provider";
import { defaultValues, signinSchema, TSigninSchema } from "@/schema/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: defaultValues(),
  });
  const { signin } = useAuth();
  const { push } = useRouter();
  const searchParamsObj = useSearchParams();

  const onSubmit = async (formdta: TSigninSchema) => {
    await signin(formdta, {
      onSuccess(response) {
        toast.success(response?.message);
        push(searchParamsObj?.get("redirect") || hrefs.home);
      },
      onError(error) {
        toast.error(error?.message || "Signin failed");
      },
    });
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm form={form} onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <Separator orientation="horizontal" />
        <p className="text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={hrefs.auth.signup} className="text-primary">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
