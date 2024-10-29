import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const profileType: string[] = ["User", "Artist", "School", "Studio", "Admin"];

const basicSignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  passwords: z
    .object({
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

const profileDetailsSchema = z.object({
  avatar: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (isValidPhoneNumber(v ?? "")) {
          return true;
        }
        return false;
      },
      { message: "Phone number is not valid" },
    ),
  profileType: z.string(),
  link: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
});

type TBasicSignup = z.infer<typeof basicSignupSchema>;
type TProfileDetails = z.infer<typeof profileDetailsSchema>;

export {
  basicSignupSchema,
  profileDetailsSchema,
  profileType,
  type TProfileDetails,
  type TBasicSignup,
};
