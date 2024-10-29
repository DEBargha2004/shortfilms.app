import * as z from "zod";

const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const forgetPasswordOtpSchema = z.object({
  otp: z.string().refine((d) => d.length === 6, {
    message: "OTP must be 6 characters long",
  }),
});

const forgetPasswordSetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TForgetPassword = z.infer<typeof forgetPasswordSchema>;
type TForgetPasswordOtp = z.infer<typeof forgetPasswordOtpSchema>;
type TForgetPasswordSetPassword = z.infer<
  typeof forgetPasswordSetPasswordSchema
>;

export {
  forgetPasswordSchema,
  forgetPasswordOtpSchema,
  forgetPasswordSetPasswordSchema,
  type TForgetPassword,
  type TForgetPasswordOtp,
  type TForgetPasswordSetPassword,
};
