import {
  ageRating,
  premiereStatus,
  privatePublishing,
  publicPublishing,
  VIDEO_UPLOAD_TYPES,
  VideoUploadType,
} from "@/constants/general";
import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  video: z.object({
    path: z.string().optional(),
    libraryId: z.string().optional(),
    href: z.string().optional(),
    type: z.enum(VIDEO_UPLOAD_TYPES),
  }),
  trailer: z.object({
    path: z.string().optional(),
    libraryId: z.string().optional(),
    href: z.string().optional(),
    type: z.enum(VIDEO_UPLOAD_TYPES),
  }),
  details: z.object({
    duration: z.string("Duration can't be empty"),
    country: z.string().min(1),
    language: z.string().min(1),
    premiereStatus: z.string().min(1),
    completionDate: z.coerce.date(),
    ageRating: z.string().min(1),
    softwareUsed: z.array(z.string()).min(1),
    pricing: z
      .object({
        isPaid: z.boolean(),
        price: z.coerce.number().optional(),
      })
      .refine(
        ({ isPaid, price }) => {
          if (isPaid && !price) return false;

          return true;
        },
        {
          message: "Price is required",
          path: ["price"],
        },
      ),
  }),
  categories: z.object({
    genres: z.array(z.string()).length(2, { message: "Select 2 genres" }),
    techniques: z
      .array(z.string())
      .length(3, { message: "Select 3 techniques" }),
    tags: z.array(z.string()),
  }),
  press: z.array(
    z.object({
      url: z.string(),
      title: z.string(),
      description: z.string().optional(),
      logo: z.string().optional(),
    }),
  ),
  playlist: z.array(z.string()),
  thumbnail: z.string(),
  schedulingOption: z
    .object({
      isScheduled: z.boolean(),
      publishDate: z.coerce.date().optional(),
    })
    .refine(
      ({ isScheduled, publishDate }) => {
        if (isScheduled && !publishDate) return false;

        return true;
      },
      { message: "Publish date is required", path: ["publishDate"] },
    ),
  credits: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      image: z.string().optional(),
    }),
  ),
  publishingOption: z
    .object({
      copyrightPermission: z.boolean(),
      publishType: z.string(),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.publishType === privatePublishing.value)
          if (data.password) {
            return true;
          } else {
            return false;
          }
        return true;
      },
      {
        message: "Password is required",
        path: ["password"],
      },
    )
    .refine((data) => data.copyrightPermission, {
      message: "Copyright Permission is required",
      path: ["copyrightPermission"],
    }),
});

export type TPostCreateSchema = z.infer<typeof postCreateSchema>;
export const defaultPostCredit: TPostCreateSchema["credits"][number] = {
  id: "",
  name: "",
  role: "",
  image: "",
};
export const defaultValues = (): TPostCreateSchema => ({
  title: "",
  description: "",
  video: {
    path: "",
    libraryId: "",
    href: "",
    type: "link" as VideoUploadType,
  },
  trailer: {
    path: "",
    libraryId: "",
    href: "",
    type: "link" as VideoUploadType,
  },
  details: {
    duration: "3",
    country: "us",
    language: "en",
    premiereStatus: premiereStatus[0],
    completionDate: new Date(),
    ageRating: ageRating[0],
    pricing: {
      isPaid: false,
      price: 0,
    },
    softwareUsed: [],
  },
  categories: {
    genres: [],
    techniques: [],
    tags: [],
  },
  press: [],
  playlist: [],
  thumbnail: "",
  credits: [],
  publishingOption: {
    copyrightPermission: false,
    publishType: publicPublishing.value,
    password: "",
  },
  schedulingOption: {
    isScheduled: false,
    publishDate: new Date(),
  },
});
