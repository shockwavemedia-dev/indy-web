import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import snakecaseKeys from 'snakecase-keys'
import '../styles/globals.css'
import { AppPropsWithLayout } from '../types/AppPropsWithLayout.type'
import { API_BASE_URL } from '../utils/constants'

axios.defaults.baseURL = API_BASE_URL

axios.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = snakecaseKeys(config.data, { deep: true })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
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
  (error) => {
    return Promise.reject(error)
  }
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
