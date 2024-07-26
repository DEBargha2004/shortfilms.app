import channel from '@/../public/images/channel.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full h-full lg:space-y-10 space-y-5 @container overflow-y-auto scroller pb-10 px-2'>
      <div className='w-full lg:h-[200px] md:h-[150px] h-[100px] bg-red-600 rounded-xl' />
      <div className='flex justify-start items-start gap-6'>
        <Image
          src={channel}
          alt={'profile'}
          height={200}
          width={200}
          className='rounded-full md:h-[180px] md:w-[180px] sm:h-[140px] sm:w-[140px] w-20 h-20'
        />
        <div className='self-stretch w-full flex flex-col sm:justify-start justify-between items-start md:gap-2 gap-1'>
          <h1 className='md:text-5xl text-3xl'>Lallantop</h1>
          <div className='space-y-1 md:[&>*]:text-base text-sm [&>*]:opacity-60 font-light'>
            <span>@Llalantop</span>
            <span className='sm:inline hidden'>•</span>
            <div className='sm:w-fit w-full sm:shrink shrink-0 gap-1 flex '>
              <span>1.5k subscribers</span>
              <span>•</span>
              <span>19 videos</span>
            </div>
          </div>
          <div className='sm:block hidden'>
            <About className='' />
          </div>
          <SubscriptionSection className='md:flex hidden justify-start items-center gap-2' />
        </div>
      </div>
      <About className='sm:hidden' />
      <SubscriptionSection className='md:hidden flex justify-start items-center gap-2' />
      {children}
    </main>
  )
}

const About = ({ className }: { className?: string }) => {
  return (
    <p className={cn('opacity-60 text-sm line-clamp-1', className)}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor
      sit amet consectetur adipisicing elit.{' '}
    </p>
  )
}

const SubscriptionSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('', className)}>
      <Button className='rounded-full w-full'>Subscribe</Button>
    </div>
  )
}
