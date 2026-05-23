export type Post = {
  id: string;
  title: string;
  image_link_16x9: string;
  user_image_1x1: string;
  username: string;
  timestamp: string;
};

export type Orientation = "vertical" | "horizontal" | "adjust";

export type Genre = { id: string; name: string; createdAt?: string };
export type Technique = { id: string; name: string; createdAt?: string };
