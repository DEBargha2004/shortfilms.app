import { Orientation } from '@/types/post'

export const templateClass = {
  post: {
    video: (orientation: Orientation) =>
      orientation === 'vertical'
        ? 'w-full aspect-video'
        : orientation === 'horizontal'
        ? 'lg:h-24 h-16 aspect-video'
        : 'lg:h-24 lg:w-auto w-full aspect-video aspect-video'
  }
}
