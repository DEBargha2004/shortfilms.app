"use client";

import { profileDetailsSchema, TProfileDetails } from "@/schema/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Center from "../_components/center";
import FormWrapper from "../_components/form-wrapper";
import ProfileDetailsForm from "@/components/custom/forms/profile-details-form";

export default function Page() {
  const form = useForm<TProfileDetails>({
    resolver: zodResolver(profileDetailsSchema),
  });

  const handleSubmit = async (e: TProfileDetails) => {};

  return (
    <Center className="items-start pt-5">
      <FormWrapper heading="Create Profile">
        <ProfileDetailsForm form={form} handleSubmit={handleSubmit} />
      </FormWrapper>
    </Center>
  );
}
