import z from "zod";

export const resetPasswordSchema = z
  .object({
    otp: z.string().length(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password and Confirm Password donot match",
      });
    }
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export const defaultValues = (): TResetPasswordSchema => ({
  otp: "",
  password: "",
  confirmPassword: "",
});
