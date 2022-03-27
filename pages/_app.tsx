import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import snakecaseKeys from 'snakecase-keys'
import { API_BASE_URL } from '../constants/http'
import '../styles/globals.css'
import { AppPropsWithLayout } from '../types/AppPropsWithLayout.type'

axios.defaults.baseURL = API_BASE_URL

axios.interceptors.request.use(
  (config) => {
    if (config.data && config.data.constructor.name !== 'FormData') {
      config.data = snakecaseKeys(config.data, { deep: true })
    }

    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true })

      if (response.data.data) {
        response.data = response.data.data
      }
    }

    return response
  },
  (error) => Promise.reject(error)
)

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
