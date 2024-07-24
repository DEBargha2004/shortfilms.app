'use client'

import { cn } from '@/lib/utils'
import { type Post } from '@/types/post'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { calculateTimeDiffWithUnit } from '@/functions/calculate-time-diff-with-unit'
import Link from 'next/link'
import { hrefs } from '@/constants/hrefs'
import { MoreVertical } from 'lucide-react'

export default function PostCard ({
  post,
  className,
  hideAvatar,
  orientation = 'vertical'
}: {
  post: Post
  className?: string
  hideAvatar?: boolean
  orientation?: 'vertical' | 'horizontal'
}) {
  return (
    <div
      className={cn(
        'w-full shrink-0 flex gap-2 @container',
        className,
        orientation === 'vertical' ? 'flex-col' : 'flex-row'
      )}
    >
      <Link
        href={hrefs.post(post.id)}
        className={cn(
          '',
          orientation === 'vertical'
            ? 'w-full'
            : 'lg:h-24 h-16 aspect-video shrink-0'
        )}
      >
        <div className={cn('w-full aspect-video rounded bg-red-400')} />
      </Link>
      <div className='w-full flex justify-between gap-3 items-start'>
        {!hideAvatar ? (
          <Avatar className='w-8 h-8'>
            <AvatarImage />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        ) : null}
        <div className='w-full flex flex-col justify-start items-start'>
          <h2
            className={cn(
              'line-clamp-2',
              orientation === 'vertical'
                ? '@lg:text-lg text-base'
                : '@lg:text-base text-sm'
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              'opacity-60',
              orientation === 'vertical'
                ? '@lg:text-base text-sm '
                : '@lg:text-base text-sm'
            )}
          >
            {post.username}
          </p>
          <div
            className={cn(
              'flex justify-start items-center gap-2 [&>p]:opacity-60',
              orientation === 'vertical'
                ? '@lg:[&>p]:text-sm [&>p]:text-xs'
                : '@lg:[&>p]:text-sm [&>p]:text-xs'
            )}
          >
            <p>27K Views</p>
            <p>•</p>
            <p>{calculateTimeDiffWithUnit(post.timestamp)}&nbsp;ago</p>
          </div>
        </div>
        <div className='flex self-stretch items-start justify-center w-5'>
          <div
            className={cn(
              'rounded-full grid place-content-center hover:bg-accent/60 transition-all shrink-0',
              orientation === 'vertical' ? 'h-10 w-10' : 'h-8 w-8'
            )}
          >
            <MoreVertical
              className={cn(
                'cursor-pointer',
                orientation === 'vertical' ? 'w-5 h-5' : 'w-4 h-4'
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
