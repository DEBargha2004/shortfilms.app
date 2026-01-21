import { Bell } from 'lucide-react'

export default function NotificationBell ({ count }: { count?: number }) {
  return (
    <div className='relative'>
      <div
        className='absolute -top-1 -right-1 h-4 px-1 rounded-full bg-red-500 text-[9px] grid place-content-center'
        hidden={!count}
      >
        {count}
      </div>
      <Bell />
    </div>
  )
}
