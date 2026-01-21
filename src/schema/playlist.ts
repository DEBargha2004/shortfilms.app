import * as z from "zod";

export const playlistSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export type TPlaylistSchema = z.infer<typeof playlistSchema>;
export const defaultValues = (): TPlaylistSchema => ({
  name: "",
  description: "",
});
