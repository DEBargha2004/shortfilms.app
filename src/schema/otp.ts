import * as z from "zod";

export const otpSchema = z.object({
  otp: z.string().length(6),
});
export type TOtpSchema = z.infer<typeof otpSchema>;
export const defaultValues = (): TOtpSchema => ({
  otp: "",
});
