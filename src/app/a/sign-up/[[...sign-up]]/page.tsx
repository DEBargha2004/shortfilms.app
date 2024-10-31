"use client";

import BasicSignupForm from "@/components/custom/forms/basic-signup-form";
import { type TBasicSignup, basicSignupSchema } from "@/schema/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../../_components/form-wrapper";
import Center from "../../_components/center";
import { isActionError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/provider/auth-provider";

export default function Page() {
  const basicSignupForm = useForm<TBasicSignup>({
    resolver: zodResolver(basicSignupSchema),
  });

  const [formLevel, setFormLevel] = useState(0);
  const { toast } = useToast();
  const { signup } = useAuth();

  const handleBaisicSignup = async (e: TBasicSignup) => {
    const res = await signup(e);

    if (isActionError(res)) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res.error,
      });
    }

    if (res) {
      toast({
        title: "Success",
        description: res.message,
      });

      return setFormLevel(1);
    }
  };

  return (
    <>
      {formLevel === 0 && (
        <Center>
          <FormWrapper heading="Sign Up" className="bg-dark-accent">
            <BasicSignupForm
              form={basicSignupForm}
              handleSubmit={handleBaisicSignup}
            />
          </FormWrapper>
        </Center>
      )}
      {formLevel === 1 && (
        <Center>
          <h1>Verify your email sent to your email</h1>
        </Center>
      )}
    </>
  );
}
