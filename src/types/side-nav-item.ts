import { HTMLProps } from 'react'
import { Icon } from './icon'

export type SideNavItem =
  | {
      type: 'app-section-link'
      title: string
      href: string
      Icon: Icon
      catchRoutes?: string[]
    }
  | {
      type: 'profile-section-link'
      title: string
      href: string
      url: string
      catchRoutes?: string[]
    }
  | {
      type: 'app-section-icon'
      href?: string
      Icon: React.FC<HTMLProps<HTMLDivElement>>
    }
  | {
      type: 'app-section-item'
      title: string
      Icon: Icon
    }
  | {
      type: 'separator'
    }
