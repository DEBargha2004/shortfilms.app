import { Orientation } from '@/types/post'
import { PostcardWrapper } from './post-card'
import { cn } from '@/lib/utils'
import { Skeleton } from '../../ui/skeleton'
import { templateClass } from '@/constants/template-class'

export default function PostLoading ({
  orientation,
  className
}: {
  orientation: Orientation
  className?: string
}) {
  return (
    <PostcardWrapper orientation={orientation} className={cn('', className)}>
      <Skeleton className={cn('', templateClass.post.video(orientation))} />
      <div className='w-full flex justify-between gap-3 items-start'>
        <Skeleton
          className={cn(
            'h-8 w-8 rounded-full shrink-0',
            orientation === 'vertical'
              ? 'block'
              : orientation === 'horizontal'
              ? 'hidden'
              : 'lg:hidden block'
          )}
        />

        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-20' />
        </div>
      </div>
    </PostcardWrapper>
  )
}
