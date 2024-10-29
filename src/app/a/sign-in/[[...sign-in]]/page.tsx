"use client";

import { signinSchema, TSignIn } from "@/schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormWrapper from "../../_components/form-wrapper";
import SigninForm from "@/components/custom/forms/signin-form";
import Center from "../../_components/center";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/actions/auth";
import { isActionError } from "@/lib/utils";

export default function Page() {
  const form = useForm<TSignIn>({
    resolver: zodResolver(signinSchema),
  });
  const { toast } = useToast();

  const handleSubmit = async (e: TSignIn) => {
    const res = await login(e);

    if (isActionError(res)) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res.error,
      });
    }

    if (res) {
      return toast({
        title: "Success",
        description: res.message,
      });
    }
  };

  return (
    <Center>
      <FormWrapper heading="Sign In" className="bg-dark-accent">
        <SigninForm form={form} onSubmit={handleSubmit} />
      </FormWrapper>
    </Center>
  );
}
