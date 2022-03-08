import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default App
