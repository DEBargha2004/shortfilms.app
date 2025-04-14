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
  details: z.object({
    duration: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
      message: "Duration must be a number",
    }),
    country: z.string().min(1),
    language: z.string().min(1),
    premiereStatus: z.string().min(1),
    completionDate: z.string().min(1),
    ageRating: z.string().min(1),

    isPaid: z.boolean(),
  }),
  categories: z.object({
    genres: z.array(z.string()),
    techniques: z.array(z.string()),
    topics: z.array(z.string()),
  }),
  playlist: z.array(z.string()),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  publishToSocialNetworks: z.boolean(),
  publisherType: z.string(),
  members: z.array(z.string()),
});

export type PostCreateSchema = z.infer<typeof postCreateSchema>;
export const defaultValues = (): PostCreateSchema => ({
  title: "",
  description: "",
  video: {
    url: "",
    type: "link",
  },
  trailer: {
    url: "",
    type: "link",
  },
  details: {
    duration: "",
    country: "",
    language: "",
    premiereStatus: "",
    completionDate: "",

    ageRating: "",
    isPaid: false,
  },
  categories: {
    genres: [],
    techniques: [],
    topics: [],
  },
  playlist: [],
  tags: [],
  thumbnail: "",
  publishToSocialNetworks: false,
  publisherType: "",
  members: [],
});
