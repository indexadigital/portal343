import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Providers from './providers'

import "bootstrap/dist/css/bootstrap.min.css"
import "@/styles/globals.css"

import { CMS_NAME, CMS_TITLE, CMS_DESC, CMS_URL, HOME_OG_IMAGE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: CMS_TITLE,
    template: `%s | ${CMS_NAME}`,
  },
  description: CMS_DESC,
  metadataBase: new URL(CMS_URL),
  alternates: {
    canonical: CMS_URL,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: CMS_URL,
    siteName: CMS_NAME,
    title: CMS_TITLE,
    description: CMS_DESC,
    images: [{ url: HOME_OG_IMAGE_URL }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@handle',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'geo.country': 'BR',
    'google-adsense-account': 'ca-pub-4827177938946826',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,600,800&display=swap" />
        <link rel="preconnect" href="https://ajax.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4827177938946826"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NVLJWGW01D"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NVLJWGW01D');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
