import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'Album cover generator',
  description: 'A simple album poster generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto w-full`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
