import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { hrefs } from '@/constants/hrefs'
import Link from 'next/link'

export const ChannelOverview = ({
  subscribers,
  title,
  image
}: {
  title: string
  subscribers: number
  image: string
}) => {
  return (
    <div className='h-10 w-auto flex justify-between items-center gap-4'>
      <Link href={hrefs.user(title)}>
        <Avatar className='h-full aspect-square'>
          <AvatarImage src={image} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </Link>
      <div className='flex flex-col justify-between items-start'>
        <Link href={hrefs.user(title)}>
          <h1 className='text-base font-semibold'>{title}</h1>
        </Link>
        <p className='text-xs opacity-60'>{subscribers} subscribers</p>
      </div>
    </div>
  )
}
