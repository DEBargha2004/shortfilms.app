import * as z from "zod";

export const techniqueCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type TTechniqueCreateSchema = z.infer<typeof techniqueCreateSchema>;

export const defaultValues = (): TTechniqueCreateSchema => ({
  name: "",
});
