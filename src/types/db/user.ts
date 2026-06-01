export type TRole = "admin" | "creator" | "moderator";

export interface User {
  name: string;
  email: string;
  image?: string;
  verifiedAt?: Date | null;
  deletedAt?: Date | null;
  role: TRole;
}
