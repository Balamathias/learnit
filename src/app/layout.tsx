import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learnit',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}>
          <Providers>
            <Navbar />
            <main className='min-h-screen bg-background pt-20'>
            {children}
            </main>
          </Providers>
          <Toaster richColors theme='dark' />
        </body>
    </html>
  )
}
