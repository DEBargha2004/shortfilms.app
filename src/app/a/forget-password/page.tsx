"use client";

import {
  forgetPasswordSchema,
  TForgetPassword,
} from "@/schema/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Center from "../_components/center";
import FormWrapper from "../_components/form-wrapper";
import ForgetPasswordForm from "@/components/custom/forms/forget-password-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/provider/auth-provider";
import { isActionError } from "@/lib/utils";

export default function Page() {
  const { toast } = useToast();

  const forgetPasswordEmailForm = useForm<TForgetPassword>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { forgetPasswordGetMail } = useAuth();

  const [formLevel, setFormLevel] = useState(0);

  const handleEmailSubmit = async (e: TForgetPassword) => {
    const res = await forgetPasswordGetMail(e);

    if (isActionError(res)) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res.error,
      });
    }

    toast({
      title: "Success",
      description: "Check your email",
    });
    setFormLevel(1);
  };

  return (
    <>
      {formLevel === 0 && (
        <Center>
          <FormWrapper heading="Forget Password" className="bg-dark-accent">
            <ForgetPasswordForm
              form={forgetPasswordEmailForm}
              onSubmit={handleEmailSubmit}
            />
          </FormWrapper>
        </Center>
      )}
      {formLevel === 1 && (
        <Center>
          <h1 className="text-2xl">Check your email</h1>
        </Center>
      )}
    </>
  );
}
