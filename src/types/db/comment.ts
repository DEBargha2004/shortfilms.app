import { Doc } from "./common";

export interface Comment {
  user: string;
  post: string;
  content: string;
  deletedAt?: Date | null;
}

export type TCommentDoc = Doc<Comment>;
