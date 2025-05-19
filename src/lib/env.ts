import * as z from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
