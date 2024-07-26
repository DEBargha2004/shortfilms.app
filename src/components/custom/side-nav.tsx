'use client'

import {
  sideNavFullViewItems,
  sideNavMiniViewItems
} from '@/constants/side-nav'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { forwardRef, HTMLProps } from 'react'
import { Separator } from '../ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { usePathname } from 'next/navigation'
import { useGlobalAppStore } from '@/store/global-app-store'

export default function SideNav ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  const { isSidebarMinimized } = useGlobalAppStore()
  return (
    <div
      className={cn('md:h-full md:w-fit w-full overflow-y-auto', className)}
      {...props}
    >
      <SideNavMiniView
        className={cn(
          'hidden',
          isSidebarMinimized
            ? 'md:flex flex-col items-stretch justify-start gap-1'
            : 'md:hidden'
        )}
      />
      <BottomNavMiniView className='md:hidden flex justify-center items-center sm:gap-6 gap-1' />
      <SideNavFullView
        className={cn('hidden', isSidebarMinimized ? 'md:hidden' : 'md:block')}
      />
    </div>
  )
}

export function BottomNavMiniView ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  const pathname = usePathname()
  return (
    <div className={cn('w-full h-fit py-1', className)} {...props}>
      {sideNavMiniViewItems.map((item, item_idx) => (
        <React.Fragment key={item_idx}>
          {item.type === 'app-section-link' && (
            <Link href={item.href} className='block sm:w-fit w-1/5 '>
              <SideNavItem
                renderType='mini'
                label={item.title}
                className='gap-1 sm:w-20 w-full rounded-sm'
                selected={
                  item.catchRoutes
                    ? item.catchRoutes.includes(pathname)
                    : item.href === pathname
                }
                side='top'
              >
                {<item.Icon className='h-5' />}
                <SideNavItemLabel className='text-xs'>
                  {item.title}
                </SideNavItemLabel>
              </SideNavItem>
            </Link>
          )}
          {item.type === 'app-section-element' && (
            <Link
              href={item.href ?? ''}
              className='inline-block sm:w-fit w-1/5 sm:shrink shrink-0'
            >
              <SideNavItem
                renderType='mini'
                className='gap-1 sm:w-20 w-full rounded-sm'
                disableTooltip
              >
                {<item.Element />}
              </SideNavItem>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
export function SideNavMiniView ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  const pathname = usePathname()
  return (
    <div className={cn('w-full h-fit py-1', className)} {...props}>
      {sideNavMiniViewItems.map((item, item_idx) => (
        <React.Fragment key={item_idx}>
          {item.type === 'app-section-link' && (
            <Link
              href={item.href}
              className='block sm:w-fit w-1/5 sm:shrink shrink-0'
            >
              <SideNavItem
                renderType='mini'
                label={item.title}
                className='gap-1 sm:w-20 w-full rounded-sm'
                selected={
                  item.catchRoutes
                    ? item.catchRoutes.includes(pathname)
                    : item.href === pathname
                }
              >
                {<item.Icon className='h-5' />}
                <SideNavItemLabel className='text-xs'>
                  {item.title}
                </SideNavItemLabel>
              </SideNavItem>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function SideNavFullView ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  const pathname = usePathname()
  return (
    <div className={cn('w-60 space-y-1', className)} {...props}>
      {sideNavFullViewItems.map((item, item_idx) => (
        <React.Fragment key={item_idx}>
          {item.type === 'app-section-link' && (
            <Link href={item.href} className='block w-full'>
              <SideNavItem
                renderType='full'
                label={item.title}
                selected={
                  item.catchRoutes
                    ? item.catchRoutes.includes(pathname)
                    : item.href === pathname
                }
              >
                {<item.Icon className='h-5 font-normal' />}
                <SideNavItemLabel className='text-sm'>
                  {item.title}
                </SideNavItemLabel>
              </SideNavItem>
            </Link>
          )}
          {item.type === 'separator' && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}

export const SideNavItemWrapper = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
    selected?: boolean
  } & HTMLProps<HTMLDivElement>
>(({ children, className, selected, ...props }, ref) => (
  <div
    className={cn(
      'w-full rounded-lg transition-all hover:bg-accent',
      selected && 'bg-accent',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </div>
))

export const SideNavItem = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
    renderType: 'mini' | 'full'
    label?: string
    selected?: boolean
    disableTooltip?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
  } & HTMLProps<HTMLDivElement>
>(
  (
    {
      children,
      className,
      renderType,
      label,
      selected,
      disableTooltip,
      side = 'right',
      ...props
    },
    ref
  ) => (
    <TooltipProvider>
      <Tooltip delayDuration={20}>
        <TooltipTrigger asChild>
          <SideNavItemWrapper className='w-full rounded' selected={selected}>
            <div
              ref={ref}
              className={cn(
                'flex items-center gap-2 px-4 py-2',
                renderType === 'mini' ? 'flex-col' : 'flex-row',
                className
              )}
              {...props}
            >
              {children}
            </div>
          </SideNavItemWrapper>
        </TooltipTrigger>
        <TooltipContent side={side} align='center' hidden={disableTooltip}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
)

export const SideNavItemLabel = forwardRef<
  HTMLParagraphElement,
  {} & HTMLProps<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => (
  <p className={cn('text-sm whitespace-nowrap', className)} {...props}>
    {children}
  </p>
))

SideNavItemWrapper.displayName = 'SideNavItemWrapper'
SideNavItem.displayName = 'SideNavItem'
SideNavItemLabel.displayName = 'SideNavItemLabel'
