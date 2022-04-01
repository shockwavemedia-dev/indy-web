import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SessionProvider } from 'next-auth/react'
import { done, start } from 'nprogress'
import 'nprogress/nprogress.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import snakecaseKeys from 'snakecase-keys'
import { API_BASE_URL } from '../constants/Http'
import '../styles/globals.css'
import { AppPropsWithLayout } from '../types/AppPropsWithLayout.type'
import { parseDates } from '../utils/DateHelpers'

const isClientSide = typeof window !== 'undefined'

axios.defaults.baseURL = API_BASE_URL

axios.interceptors.request.use(
  (config) => {
    if (isClientSide) {
      start()
    }

    if (config.data && config.data.constructor.name !== 'FormData') {
      config.data = snakecaseKeys(config.data, { deep: true })
    }

    return config
  },
  (error) => {
    Promise.reject(error)

    if (isClientSide) {
      done()
    }
  }
)

axios.interceptors.response.use(
  (response) => {
    if (isClientSide) {
      done()
    }

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true })
      parseDates(response.data)
    }

    return response
  },
  (error) => {
    Promise.reject(error)

    if (isClientSide) {
      done()
    }
  }
)

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session} refetchInterval={3600}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
