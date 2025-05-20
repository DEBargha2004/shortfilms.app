import { privatePublishing, publicPublishing } from "@/constants/general";
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
    tags: z.array(z.string()),
  }),
  playlist: z.array(z.string()),
  thumbnail: z.string(),
  publishToSocialNetworks: z.boolean(),
  publisherType: z.string(),
  members: z.array(z.string()),
  schedulingOption: z
    .object({
      isScheduled: z.boolean(),
      publishDate: z.string().optional(),
    })
    .refine(
      ({ isScheduled, publishDate }) => {
        if (isScheduled && !publishDate) return false;

        return true;
      },
      { message: "Publish date is required", path: ["publishDate"] }
    ),
  publishingOption: z
    .object({
      copyrightPermission: z.boolean(),
      publishType: z.string(),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.publishType === privatePublishing.value && data.password)
          return true;
      },
      {
        message: "Password is required",
        path: ["password"],
      }
    ),
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
    tags: [],
  },
  playlist: [],
  thumbnail: "",
  publishToSocialNetworks: false,
  publisherType: "",
  members: [],
  publishingOption: {
    copyrightPermission: false,
    publishType: publicPublishing.value,
    password: "",
  },
  schedulingOption: {
    isScheduled: false,
    publishDate: "",
  },
});
