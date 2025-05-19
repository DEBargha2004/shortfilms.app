"use client";

import ResetPasswordForm from "@/components/custom/forms/reset-password";
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
  resetPasswordSchema,
  TResetPasswordSchema,
} from "@/schema/reset-password";
import { DefaultSuccessResponse, ErrorResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaultValues(),
  });
  const { push } = useRouter();

  const onSubmit = async (formdata: TResetPasswordSchema) => {
    const [res, err] = await tryCatch<
      AxiosResponse<DefaultSuccessResponse>,
      AxiosError<ErrorResponse>
    >(
      axios.post(hrefs.api.auth.resetPassword, {
        token: formdata.otp,
        password: formdata.password,
      })
    );

    if (res) {
      toast.success(res.data.message);
      push(hrefs.auth.signin);
    }

    if (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter OTP and new password</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
