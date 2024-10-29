"use client";

import {
  forgetPasswordOtpSchema,
  forgetPasswordSchema,
  forgetPasswordSetPasswordSchema,
  TForgetPassword,
  TForgetPasswordOtp,
  TForgetPasswordSetPassword,
} from "@/schema/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Center from "../_components/center";
import FormWrapper from "../_components/form-wrapper";
import ForgetPasswordForm from "@/components/custom/forms/forget-password-form";
import { useState } from "react";
import ForgetPasswordOtpForm from "@/components/custom/forms/forget-password-otp";
import ForgetPasswordSetPasswordForm from "@/components/custom/forms/forget-password-setpassword";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();

  const forgetPasswordEmailForm = useForm<TForgetPassword>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const forgetPasswordOtpForm = useForm<TForgetPasswordOtp>({
    resolver: zodResolver(forgetPasswordOtpSchema),
  });
  const forgetPasswordSetPassword = useForm<TForgetPasswordSetPassword>({
    resolver: zodResolver(forgetPasswordSetPasswordSchema),
  });

  const [formLevel, setFormLevel] = useState(0);

  const handleEmailSubmit = async (e: TForgetPassword) => {
    setFormLevel(1);
  };
  const handleOtpSubmit = async (e: TForgetPasswordOtp) => {
    setFormLevel(2);
  };
  const handleSetPasswordSubmit = async (e: TForgetPasswordSetPassword) => {};

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
          <FormWrapper>
            <ForgetPasswordOtpForm
              form={forgetPasswordOtpForm}
              onSubmit={handleOtpSubmit}
            />
          </FormWrapper>
        </Center>
      )}
      {formLevel === 2 && (
        <Center>
          <FormWrapper>
            <ForgetPasswordSetPasswordForm
              form={forgetPasswordSetPassword}
              onSubmit={handleSetPasswordSubmit}
            />
          </FormWrapper>
        </Center>
      )}
    </>
  );
}
