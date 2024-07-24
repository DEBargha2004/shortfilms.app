import { cn } from '@/lib/utils'
import { SideNavItem } from '@/types/side-nav-item'
import {
  CirclePlus,
  Clapperboard,
  Compass,
  Film,
  Home,
  ListVideo
} from 'lucide-react'

export const sideNavMiniViewItems: SideNavItem[] = [
  {
    type: 'app-section-link',
    title: 'Home',
    href: '/',
    Icon: Home
  },
  {
    type: 'app-section-link',
    title: 'Explore',
    href: '/explore',
    Icon: Compass
  },
  {
    type: 'app-section-icon',
    Icon: ({ className, ...props }) => (
      <div
        className={cn('w-full grid place-content-center', className)}
        {...props}
      >
        <CirclePlus className='w-10 h-10 font-extralight' />
      </div>
    )
  },
  {
    type: 'app-section-link',
    title: 'Subscriptions',
    href: '/subscriptions',
    Icon: ListVideo
  },
  {
    type: 'app-section-link',
    title: 'Library',
    href: '/library',
    Icon: Film
  }
]

export const sideNavFullViewItems: SideNavItem[] = [
  {
    type: 'app-section-link',
    title: 'Home',
    href: '/',
    Icon: Home
  },
  {
    type: 'app-section-link',
    title: 'Short Films',
    href: '/shortfilms',
    Icon: Clapperboard
  },
  {
    type: 'separator'
  }
]
