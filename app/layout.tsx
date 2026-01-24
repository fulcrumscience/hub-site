import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Script from 'next/script'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import { FixEditLink } from './components/fix-edit-link'

export const metadata = {
  title: {
    default: 'AI4Science Hub',
    template: '%s – AI4Science Hub'
  },
  description: 'Curated resources for AI in scientific research',
  openGraph: {
    title: 'AI4Science Hub',
    description: 'Curated resources for AI in scientific research',
    siteName: 'AI4Science Hub',
    images: [
      {
        url: '/images/fulcrum_logo.png',
        width: 1200,
        height: 630,
        alt: 'AI4Science Hub'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI4Science Hub',
    description: 'Curated resources for AI in scientific research',
    images: ['/images/fulcrum_logo.png']
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/images/apple-touch-icon.png'
  }
}

const navbar = (
  <Navbar
    logo={
      <span className="hub-logo">
        <img src="/images/favicon-32x32.png" alt="" style={{ height: '20px', width: '20px' }} />
        AI4Science Hub
      </span>
    }
    projectLink="https://github.com/fulcrumscience/hub-content/"
  />
)

const footer = (
  <Footer>
    <span className="hub-footer">
      Fulcrum {new Date().getFullYear()} · <a href="https://visits.fulcrum.science/share/XpDSIgXZZj4cVbro/hub.fulcrum.science" target="_blank" rel="noopener noreferrer">Public visitor count</a>
    </span>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <Script
        defer
        src="https://visits.fulcrum.science/script.js"
        data-website-id="e2426e0a-e598-4a08-9335-2c6c635cb532"
      />
      <body>
        <FixEditLink />
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/fulcrumscience/hub-content/blob/main"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: true }}
          darkMode={true}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
