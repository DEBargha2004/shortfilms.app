export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='lg:w-[400px] w-full grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-2.5'>
      {children}
    </div>
  )
}
