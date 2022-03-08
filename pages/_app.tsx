import { NextPage } from 'next'
import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
  clientAuth: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {Component.clientAuth ? (
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  )
}

const Auth = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })

  if (status === 'authenticated') {
    return <>{children}</>
  }

  return null
}

export default App
