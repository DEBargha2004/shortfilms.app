"use client";

import SignUpForm from "@/components/custom/forms/signup";
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
import { tryCatch } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";
import { FileVerification } from "@/schema/file-verification";
import { defaultValues, signupSchema, TSignUpSchema } from "@/schema/signup";
import { DefaultSuccessResponse, ErrorResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultValues(),
  });
  const { signup } = useAuth();
  const onSubmit = async (formdata: TSignUpSchema) => {
    await signup(formdata, {
      onSuccess(response) {
        toast.success(response?.message);
      },
      onError(error) {
        toast.error(error?.message || "Signup failed");
      },
    });
  };
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to access the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm form={form} onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className="flex-col gap-6">
        <Separator />
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href={hrefs.auth.signin} className="text-primary">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
