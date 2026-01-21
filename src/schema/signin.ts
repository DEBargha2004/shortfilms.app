import * as z from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TSigninSchema = z.infer<typeof signinSchema>;
export const defaultValues = (): TSigninSchema => ({
  email: "",
  password: "",
});
