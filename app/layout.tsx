import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { GlobalContextProvider, } from '@/app/context/searchEventContext'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Eventify',
  description: 'Eventify is a platform for event management ',
  icons: {
    icon: '/assets/images/logo.png'
  }

}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
