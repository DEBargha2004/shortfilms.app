"use client";

import ForgetPassword from "@/components/custom/forms/forget-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hrefs } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import {
  defaultValues,
  forgetPasswordSchema,
  TForgetPasswordSchema,
} from "@/schema/forget-password";
import { DefaultSuccessResponse, ErrorResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: defaultValues(),
  });
  const { push } = useRouter();

  const onSubmit = async (formdata: TForgetPasswordSchema) => {
    const [res, err] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse>,
      AxiosError<ErrorResponse>
    >(axios.post(hrefs.api.auth.forgetPassword, { email: formdata.email }));

    if (res) {
      toast.success(res.data.message);
      push(hrefs.auth.resetPassword);
    }

    if (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPassword form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
