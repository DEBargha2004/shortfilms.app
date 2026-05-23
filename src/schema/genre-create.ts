import * as z from "zod";

export const genreCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type TGenreCreateSchema = z.infer<typeof genreCreateSchema>;

export const defaultValues = (): TGenreCreateSchema => ({
  name: "",
});
