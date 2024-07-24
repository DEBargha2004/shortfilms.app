'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function NavigationHelper () {
  const { setIsSideNavOpen } = useGlobalAppStore()
  const pathname = usePathname()

  useEffect(() => {
    setIsSideNavOpen(false)
  }, [pathname])
  return null
}
