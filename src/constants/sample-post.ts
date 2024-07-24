import { Post } from '@/types/post'
import { v4 as uuidv4 } from 'uuid'

export const sample_posts: Post[] = [
  {
    id: uuidv4(),
    title: 'Sunset Over the City',
    image_link_16x9: 'https://example.com/images/sunset_city_16x9.jpg',
    user_image_1x1: 'https://example.com/images/user1_profile_1x1.jpg',
    username: 'city_sunsetter',
    timestamp: '2024-07-22T09:00:00Z'
  },
  {
    id: uuidv4(),
    title: 'Beach Vacation',
    image_link_16x9: 'https://example.com/images/beach_vacation_16x9.jpg',
    user_image_1x1: 'https://example.com/images/user2_profile_1x1.jpg',
    username: 'beach_bum',
    timestamp: '2024-07-21T16:45:00Z'
  },
  {
    id: uuidv4(),
    title: 'Mountain Adventure',
    image_link_16x9: 'https://example.com/images/mountain_adventure_16x9.jpg',
    user_image_1x1: 'https://example.com/images/user3_profile_1x1.jpg',
    username: 'adventure_lover',
    timestamp: '2024-07-20T12:30:00Z'
  },
  {
    id: uuidv4(),
    title: 'Urban Nightlife',
    image_link_16x9: 'https://example.com/images/urban_nightlife_16x9.jpg',
    user_image_1x1: 'https://example.com/images/user4_profile_1x1.jpg',
    username: 'night_owl',
    timestamp: '2024-07-19T22:15:00Z'
  }
]
