import Image from 'next/image'
import product_logo from '@/../public/images/product-logo.jpg'
import { cn } from '@/lib/utils'

export default function ProductLogo ({ className }: { className?: string }) {
  return (
    <Image
      src={product_logo}
      alt='Product Logo'
      height={100}
      width={200}
      className={cn('', className)}
    />
  )
}
