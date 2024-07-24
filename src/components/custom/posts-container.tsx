import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

export const PostsContainer = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <section ref={ref} className={cn('grid gap-3', className)} {...props}>
    {children}
  </section>
))

export const GenreTitle = forwardRef<
  HTMLHeadingElement,
  { children: string } & HTMLProps<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-2xl font-bold', className)} {...props}>
    {children}
  </h2>
))

export const PostCardContainer = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode } & HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full flex gap-2', 'overflow-y-auto', className)}
    {...props}
  >
    {children}
  </div>
))

PostsContainer.displayName = 'PostsContainer'
GenreTitle.displayName = 'GenreTitle'
PostCardContainer.displayName = 'PostCardContainer'
