import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  video: z.object({
    url: z.string(),
    type: z.enum(["link", "custom"]),
  }),
  trailer: z.object({
    url: z.string(),
    type: z.enum(["link", "custom"]),
  }),
  isPaid: z.boolean(),
  playlist: z.array(z.string()),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  publishToSocialNetworks: z.boolean(),
  school: z.string(),
  studio: z.string(),
  softwares: z.array(z.string()),
  members: z.array(z.string()),
});

export type PostCreateSchema = z.infer<typeof postCreateSchema>;
