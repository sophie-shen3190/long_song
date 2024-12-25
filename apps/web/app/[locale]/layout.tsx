import { Toaster } from '@ui/components/toaster'
import { cn } from '@ui/lib'
import { Provider as JotaiProvider } from 'jotai'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Poppins } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { ApiClientProvider } from '@shared/components/ApiClientProvider'
import { GradientBackgroundWrapper } from '@shared/components/GradientBackgroundWrapper'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import 'cropperjs/dist/cropper.css'

import { config } from '@config'
import Script from 'next/script'

// export const metadata: Metadata = {
//   title: {
//     absolute: 'AI-Powered Music Creator - Application',
//     default: 'AI-Powered Music Creator- Application',
//     template: '%s | AI-Powered Music Creator - Application'
//   }
// }

const sansFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          id='clarity'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "pcm1e7hyjb");
          `
          }}
        />

        {/* Plausible */}
        <Script id='plausible' strategy='beforeInteractive' data-domain='makesong.com' src='https://click.pageview.click/js/script.js' />

        {/* Google Tag Manager */}
        <Script
          id='gtm'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6CTMFZX');
          `
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans text-foreground antialiased', sansFont.variable)}>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-K6CTMFZX'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
        <NextTopLoader color='var(--colors-primary)' />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute='class'
            disableTransitionOnChange
            enableSystem
            defaultTheme={config.ui.defaultTheme}
            themes={config.ui.enabledThemes}>
            <ApiClientProvider>
              <JotaiProvider>
                <GradientBackgroundWrapper>{children}</GradientBackgroundWrapper>
              </JotaiProvider>
            </ApiClientProvider>
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>

        <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-F6YNFBVTX0' />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F6YNFBVTX0');
            `
          }}
        />

        <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=AW-16671206695' />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16671206695');
    `
          }}
        />
      </body>
    </html>
  )
}
