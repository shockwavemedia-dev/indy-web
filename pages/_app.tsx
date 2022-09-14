import { createTheme, ThemeProvider } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { getSession, SessionProvider, signOut as nextAuthSignOut } from 'next-auth/react'
import { done, start } from 'nprogress'
import 'nprogress/nprogress.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import snakecaseKeys from 'snakecase-keys'
import { ToastContainer } from '../components/ToastContainer'
import { EXCLUDE_KEYS } from '../constants/ExcludeKeys'
import { API_BASE_URL } from '../constants/Http'
import '../styles/globals.css'
import { AppPropsWithLayout } from '../types/pages/AppPropsWithLayout.type'
import { parseDates } from '../utils/DateHelpers'
import { isClientSide } from '../utils/EnvironmentHelpers'

axios.defaults.baseURL = API_BASE_URL
axios.interceptors.request.use(
  async (config) => {
    const session = await getSession()

    if (isClientSide) {
      start()
    }

    if (config.data && config.data.constructor.name !== 'FormData') {
      config.data = snakecaseKeys(config.data, { deep: true, exclude: EXCLUDE_KEYS })
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  },
  (error) => {
    if (isClientSide) {
      done()
    }

    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      nextAuthSignOut()
    }
  }
)

axios.interceptors.response.use(
  (response) => {
    if (isClientSide) {
      done()
    }

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true, exclude: EXCLUDE_KEYS })
      parseDates(response.data)
    }

    return response
  },
  (error) => {
    if (isClientSide) {
      done()
    }

    return Promise.reject(error)
  }
)

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#F25D23',
    },
  },
})

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
