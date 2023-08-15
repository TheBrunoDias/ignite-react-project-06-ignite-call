import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import '@/lib/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { DefaultSeo } from 'next-seo'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt-BR',
          siteName: 'Ignite Call',
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <div className={roboto.className}>
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
