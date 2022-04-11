import { AppProps } from 'next/app'
import { NextPageWithLayout } from './NextPageWithLayout.type'

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
