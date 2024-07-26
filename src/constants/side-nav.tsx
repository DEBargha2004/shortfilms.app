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
import { hrefs } from './hrefs'

export const sideNavMiniViewItems: SideNavItem[] = [
  {
    type: 'app-section-link',
    title: 'Home',
    href: hrefs.home,
    Icon: Home
  },
  {
    type: 'app-section-link',
    title: 'Explore',
    href: hrefs.explore,
    Icon: Compass
  },
  {
    type: 'app-section-element',
    Element: ({ className, ...props }) => (
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
    href: hrefs.subscriptions,
    Icon: ListVideo
  },
  {
    type: 'app-section-link',
    title: 'Library',
    href: hrefs.library,
    Icon: Film
  }
]

export const sideNavFullViewItems: SideNavItem[] = [
  {
    type: 'app-section-link',
    title: 'Home',
    href: hrefs.home,
    Icon: Home
  },
  {
    type: 'app-section-link',
    title: 'Shorts',
    href: hrefs.shorts,
    Icon: Clapperboard
  },
  {
    type: 'app-section-link',
    title: 'Subscriptions',
    href: hrefs.subscriptions,
    Icon: ListVideo
  },
  {
    type: 'separator'
  }
]
