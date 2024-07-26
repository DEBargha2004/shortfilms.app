'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { usePrevious, useWindowSize } from '@uidotdev/usehooks'

export default function NavigationHelper () {
  const { setIsSideNavOpen, setIsSidebarMinimized } = useGlobalAppStore()
  const windowDimension = useWindowSize()
  const previousWindowDimension = usePrevious(windowDimension)
  const pathname = usePathname()

  useEffect(() => {
    setIsSideNavOpen(false)
  }, [pathname])

  useEffect(() => {
    if (
      windowDimension?.width! > previousWindowDimension?.width! &&
      windowDimension?.width! >= 1024 &&
      windowDimension?.width! <= 1280
    ) {
      setIsSidebarMinimized(false)
    }
    if (
      windowDimension?.width! < previousWindowDimension?.width! &&
      windowDimension?.width! >= 1024 &&
      windowDimension?.width! <= 1280
    ) {
      setIsSidebarMinimized(true)
    }
  }, [windowDimension, previousWindowDimension])

  useEffect(() => {
    if (windowDimension?.width! <= 1080) {
      setIsSidebarMinimized(true)
    }
  }, [windowDimension])
  return null
}
