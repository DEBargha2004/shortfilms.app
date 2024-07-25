import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { ThemeProvider } from '@/provider/theme-provider'
import './globals.css'
import { Navbar, NavigationHelper } from '@/components/custom'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Short Films',
  description: 'Short Films Platform'
}

export default function RootLayout ({
  children,
  post
}: {
  children: React.ReactNode
  post: React.ReactNode
}) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body className={roboto.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className='h-[calc(100%-64px)] overflow-y-scroll scroller relative'>
              {children}
              {post}
            </div>

            <NavigationHelper />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
