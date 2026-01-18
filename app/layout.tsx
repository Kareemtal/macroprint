import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/lib/context/auth-context'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'MacroPrint - FDA-Style Nutrition Label Generator for Meal Prep',
    template: '%s | MacroPrint',
  },
  description:
    'Generate professional FDA-style nutrition labels for your meal prep business in seconds. Calculate macros, track allergens, and print compliant labels.',
  keywords: [
    'nutrition label generator',
    'FDA nutrition facts',
    'meal prep labels',
    'macro calculator',
    'food labeling',
    'allergen tracking',
    'nutrition facts label maker',
    'meal prep business',
    'catering labels',
  ],
  authors: [{ name: 'MacroPrint' }],
  creator: 'MacroPrint',
  publisher: 'MacroPrint',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MacroPrint',
    title: 'MacroPrint - FDA-Style Nutrition Label Generator',
    description:
      'Generate professional FDA-style nutrition labels for your meal prep business. Calculate macros, track allergens, and print compliant labels in seconds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MacroPrint - FDA-Style Nutrition Label Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroPrint - FDA-Style Nutrition Label Generator',
    description:
      'Generate professional FDA-style nutrition labels for your meal prep business in seconds.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
