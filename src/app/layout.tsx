import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { ThemeProvider } from '@/provider/theme-provider'
import './globals.css'
import { Navbar, NavigationHelper } from '@/components/custom'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Short Films',
  description: 'Short Films Platform'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
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
            <div className='h-[calc(100%-64px)] overflow-y-auto'>
              {children}
            </div>
            <NavigationHelper />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
