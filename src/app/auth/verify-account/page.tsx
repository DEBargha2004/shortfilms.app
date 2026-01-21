"use client";

import OtpForm from "@/components/custom/forms/otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/provider/auth-provider";
import { defaultValues, otpSchema, TOtpSchema } from "@/schema/otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<TOtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: defaultValues(),
  });
  const { verifyAccount } = useAuth();

  const onSubmit = async (formdata: TOtpSchema) => {
    await verifyAccount(formdata, {
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
        <CardTitle>OTP</CardTitle>
        <CardDescription>Enter the OTP to verify your account</CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
