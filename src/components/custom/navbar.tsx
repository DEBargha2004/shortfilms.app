'use client'

import { Bell, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { SideNavFullView } from './side-nav'
import ProductLogo from './product-logo'
import { Input } from '../ui/input'
import { SearchInput } from './search-input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import NotificationBell from './notification-bell'

export default function Navbar () {
  return (
    <div className='h-16 w-full lg:px-4 px-1 flex justify-between items-center gap-2'>
      <div className='flex justify-start items-center gap-2'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} className='px-2 h-3/4 lg:hidden block'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='w-fit p-0 py-2'>
            <SideNavFullView />
          </SheetContent>
        </Sheet>
        <ProductLogo className='h-8 w-fit object-contain' />
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
