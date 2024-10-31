"use client";

import {
  forgetPasswordSetPasswordSchema,
  TForgetPasswordSetPassword,
} from "@/schema/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Center from "../../_components/center";
import FormWrapper from "../../_components/form-wrapper";
import ForgetPasswordSetPasswordForm from "@/components/custom/forms/forget-password-setpassword";
import { useMemo } from "react";
import { decodeJWT } from "@/lib/jwt";
import { notFound } from "next/navigation";
import { useAuth } from "@/provider/auth-provider";
import { isActionError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page({
  params: { token },
}: {
  params: { token: string };
}) {
  const forgetPasswordSetPassword = useForm<TForgetPasswordSetPassword>({
    resolver: zodResolver(forgetPasswordSetPasswordSchema),
  });
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const decodedJWT = useMemo(() => {
    return decodeJWT(token);
  }, [token]);

  const handleSetPasswordSubmit = async (e: TForgetPasswordSetPassword) => {
    const res = await resetPassword(e, token);
    if (isActionError(res)) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res.error,
      });
    }

    if (!res || !res.success) {
      return toast({
        title: "Error",
        description: "Could not reset password",
      });
    }

    toast({
      title: "Success",
      description: "Password reset successfully",
    });

    router.push("/a/sign-in");
  };

  if (!decodedJWT.email) {
    return notFound();
  }
  return (
    <Center>
      <FormWrapper heading="Reset Password">
        <div className="pb-4">
          <p>
            Reset password for{" "}
            <span className="bg-light-accent p-0.5 rounded">
              {decodedJWT?.email}
            </span>
          </p>
        </div>
        <ForgetPasswordSetPasswordForm
          form={forgetPasswordSetPassword}
          onSubmit={handleSetPasswordSubmit}
        />
      </FormWrapper>
    </Center>
  );
}
