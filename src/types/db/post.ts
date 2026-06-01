import { Doc } from "./common";

export type AllowedVideoUploadType = "link" | "file" | "drive";

export interface Video {
  type: AllowedVideoUploadType;
  libraryId?: string;
  path?: string;
  href?: string;
}

export interface Pricing {
  isPaid: boolean;
  price?: string;
}

export interface Metadata {
  duration: string;
  country: string;
  language: string;
  premiereStatus: string;
  completionDate: Date;
  ageRating: string;
  pricing: Pricing;
  softwareUsed: string[];
}

export interface Categories {
  genres: string[];
  techniques: string[];
  tags: string[];
}

export interface Credit {
  id: string;
  name: string;
  role: string;
}

export interface PublishingOption {
  copyrightPermission: boolean;
  publishType: string;
  password?: string;
}

export interface SchedulingOption {
  isScheduled: boolean;
  publishDate?: Date;
}

export interface Press {
  url: string;
  title: string;
  description?: string;
  logo?: string;
}

export interface Post {
  user: string;
  title: string;
  description?: string;
  video: Video;
  trailer: Video;
  details: Metadata;
  categories: Categories;
  playlist: string[];
  thumbnail?: string;
  credits: Credit[];
  publishingOption: PublishingOption;
  schedulingOption?: SchedulingOption;
  press?: Press[];
  deletedAt?: Date | null;
  verifiedAt?: Date | null;
  likesCount?: number;
  dislikesCount?: number;
  commentsCount?: number;
}

export type TPostDoc = Doc<Post>;
