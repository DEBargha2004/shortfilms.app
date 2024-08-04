'use client'

import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { SideNavFullView } from './side-nav'
import ProductLogo from './product-logo'
import { SearchInput } from './search-input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import NotificationBell from './notification-bell'
import { useGlobalAppStore } from '@/store/global-app-store'
import Link from 'next/link'
import { hrefs } from '@/constants/hrefs'

export default function Navbar () {
  const {
    isSideNavOpen,
    setIsSideNavOpen,
    setIsSidebarMinimized,
    isSidebarMinimized
  } = useGlobalAppStore()
  return (
    <div className='h-16 w-full md:px-4 px-2 flex justify-between items-center gap-2'>
      <div className='flex justify-start items-center gap-2'>
        <Button
          variant={'outline'}
          className='px-1.5 h-3/4 md:block hidden'
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
        >
          <Menu className='h-5' />
        </Button>
        <Sheet open={isSideNavOpen} onOpenChange={setIsSideNavOpen}>
          <SheetTrigger asChild>
            <Button
              variant={'outline'}
              className='px-1.5 h-3/4 md:hidden block'
            >
              <Menu className='h-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='w-fit p-0 py-2'>
            <SideNavFullView />
          </SheetContent>
        </Sheet>
        <Link href={hrefs.home}>
          <ProductLogo className='h-8 w-fit object-contain' />
        </Link>
      </div>
      <div className='w-2/5 shrink-0'>
        <SearchInput />
      </div>
      <div className='flex justify-start items-center gap-3'>
        <NotificationBell count={23} />
        <Avatar className=''>
          <AvatarImage />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
