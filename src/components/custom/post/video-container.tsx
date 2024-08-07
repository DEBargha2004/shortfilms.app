import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

export const VideoContaner = forwardRef<
  HTMLDivElement,
  {} & Omit<HTMLProps<HTMLDivElement>, 'ref'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'h-auto w-full lg:w-[calc(100%-400px)] 2xl:w-[65%]',
      'transition-all',
      'shrink-0 grow-0',
      className
    )}
    {...props}
  ></div>
))

export const VideoTitle = forwardRef<
  HTMLHeadingElement,
  { children: React.ReactNode } & HTMLProps<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-xl font-bold line-clamp-2', className)}
    {...props}
  >
    {children}
  </h2>
))

VideoContaner.displayName = 'VideoContaner'
VideoTitle.displayName = 'VideoTitle'
