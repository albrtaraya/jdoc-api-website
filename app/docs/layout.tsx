import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JDoc-API Oficial Website',
  description: 'JDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautifulJDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautiful, functional documentation websites. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.',
  icons: {
    icon: '/logo.ico'
  },
  openGraph: {
    title: 'JDoc-API Oficial Website',
    description: 'JDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautifulJDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautiful, functional documentation websites. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.',
    images: ['/website.webp'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JDoc-API Oficial Website',
    description: 'JDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautifulJDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautiful, functional documentation websites. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.',
    images: ['/website.webp']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
