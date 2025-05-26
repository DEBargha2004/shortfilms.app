import {
  ageRating,
  premiereStatus,
  privatePublishing,
  publicPublishing,
  VideoUploadType,
  videoUploadTypesIds,
} from "@/constants/general";
import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  video: z.object({
    payload: z.string(),
    type: z.string(),
  }),
  trailer: z.object({
    payload: z.string(),
    type: z.string(),
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
    softwareUsed: z.array(z.string()),
    isPaid: z.boolean(),
  }),
  categories: z.object({
    genres: z.array(z.string()),
    techniques: z.array(z.string()),
    tags: z.array(z.string()),
  }),
  playlist: z.array(z.string()),
  thumbnail: z.string(),
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
    payload: "",
    type: "link" as VideoUploadType,
  },
  trailer: {
    payload: "",
    type: "link" as VideoUploadType,
  },
  details: {
    duration: "3",
    country: "us",
    language: "en",
    premiereStatus: premiereStatus[0],
    completionDate: "2022-01-01",
    ageRating: ageRating[0],
    isPaid: false,
    softwareUsed: [],
  },
  categories: {
    genres: [],
    techniques: [],
    tags: [],
  },
  playlist: [],
  thumbnail: "",
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
