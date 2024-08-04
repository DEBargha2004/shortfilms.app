import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export default function ContentList ({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('grid gap-3', className)} {...props}>
      {children}
    </div>
  )
}

ContentList.Title = function ContentListTitle ({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={cn('text-2xl font-semibold ', className)} {...props}>
      {children}
    </h1>
  )
}

ContentList.CardsContainer = function ContentListCardsContainer ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Carousel className={cn('overflow-hidden', className)}>
      <CarouselContent className=''>{children}</CarouselContent>
      <CarouselNext className='right-2 -translate-y-10' />
      <CarouselPrevious className='left-2 -translate-y-10' />
    </Carousel>
  )
}
