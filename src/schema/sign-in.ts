import * as z from "zod";

const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type TSignIn = z.infer<typeof signinSchema>;

export { signinSchema, type TSignIn };
