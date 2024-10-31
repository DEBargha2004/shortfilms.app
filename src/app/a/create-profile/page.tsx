"use client";

import { profileDetailsSchema, TProfileDetails } from "@/schema/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Center from "../_components/center";
import FormWrapper from "../_components/form-wrapper";
import ProfileDetailsForm from "@/components/custom/forms/profile-details-form";
import { useEffect } from "react";
import { useAuth } from "@/provider/auth-provider";
import { isActionError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getUser } from "@/actions/auth";

export default function Page() {
  const form = useForm<TProfileDetails>({
    resolver: zodResolver(profileDetailsSchema),
  });
  const { createProfile, user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: TProfileDetails) => {
    const res = await createProfile(e);

    if (isActionError(res)) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res.error,
      });
    }

    toast({
      title: "Profile created",
      description: "Your profile has been created successfully.",
    });
  };

  useEffect(() => {
    if (user) {
      getUser().then((res) => {
        if (isActionError(res)) {
          return toast({
            variant: "destructive",
            title: "Error",
            description: res.error,
          });
        }

        if (res && res.user) {
          return form.reset({
            username: res.user.username,
            email: res.user.email,
            about: res.user.about,
            avatar: res.user.avatar,
            profileType: res.user.profileType,
            link: res.user.link,
            location: res.user.location,
            phone: res.user.phone,
          });
        }
      });
    }
  }, [user]);

  return (
    <Center className="items-start py-5 h-auto">
      <FormWrapper heading="Create Profile" className="bg-dark-accent">
        <ProfileDetailsForm form={form} handleSubmit={handleSubmit} />
      </FormWrapper>
    </Center>
  );
}
