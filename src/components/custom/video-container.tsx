import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

export const VideoContaner = forwardRef<
  HTMLDivElement,
  {} & Omit<HTMLProps<HTMLDivElement>, 'ref'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'h-auto w-full lg:w-[calc(100%-400px)] 2xl:w-[70%] 3xl:w-[65%] 4xl:w-3/5',
      'transition-all',
      'shrink-0',
      className
    )}
    {...props}
  ></div>
))

VideoContaner.displayName = 'VideoContaner'
