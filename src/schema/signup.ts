import * as z from "zod";

export const signupSchema = z
  .object({
    avatar: z.string().optional(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (!password)
      return ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password is required",
      });
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password and Confirm Password donot match",
      });
    }
  });

export type TSignUpSchema = z.infer<typeof signupSchema>;
export const defaultValues = (): TSignUpSchema => ({
  avatar: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
