import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

export const SearchInput = forwardRef<
  HTMLDivElement,
  {} & HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex justify-start items-start rounded-md', '', className)}
      {...props}
      tabIndex={1}
    >
      <Input
        className='rounded-r-none focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 bg-transparent z-10'
        placeholder='Search'
      />
      <div className='px-4 self-stretch grid place-content-center bg-accent'>
        <Search className='w-5 h-5' />
      </div>
    </div>
  )
})

SearchInput.displayName = 'SearchInput'
