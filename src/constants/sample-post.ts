import { Post } from "@/types/post";
import { v4 as uuidv4 } from "uuid";

export const sample_posts: Post[] = [
  {
    id: "1",
    title: "Sunset Over the City",
    image_link_16x9: "https://www.youtube.com/watch?v=C4ZP3--XhyU",
    user_image_1x1: "https://example.com/images/user1_profile_1x1.jpg",
    username: "city_sunsetter",
    timestamp: "2024-07-22T09:00:00Z",
  },
  {
    id: "2",
    title: "Beach Vacation",
    image_link_16x9: "https://www.dailymotion.com/video/x8a9o0x",
    user_image_1x1: "https://example.com/images/user2_profile_1x1.jpg",
    username: "beach_bum",
    timestamp: "2024-07-21T16:45:00Z",
  },
  {
    id: "3",
    title: "Mountain Adventure",
    image_link_16x9: "https://vimeo.com/837741701",
    user_image_1x1: "https://example.com/images/user3_profile_1x1.jpg",
    username: "adventure_lover",
    timestamp: "2024-07-20T12:30:00Z",
  },
  {
    id: "4",
    title: "Urban Nightlife",
    image_link_16x9: "https://www.youtube.com/watch?v=C4ZP3--XhyU",
    user_image_1x1: "https://example.com/images/user4_profile_1x1.jpg",
    username: "night_owl",
    timestamp: "2024-07-19T22:15:00Z",
  },
];
