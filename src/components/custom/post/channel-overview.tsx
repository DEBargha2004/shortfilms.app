import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
      <Avatar className='h-full aspect-square'>
        <AvatarImage src={image} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className='flex flex-col justify-between items-start'>
        <h1 className='text-base font-semibold'>{title}</h1>
        <p className='text-xs opacity-60'>{subscribers} subscribers</p>
      </div>
    </div>
  )
}
