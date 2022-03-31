import Head from 'next/head'
import { ReactElement } from 'react'
import AppLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => (
  <Head>
    <title>Daily Press - Analytics</title>
  </Head>
)

Dashboard.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default Dashboard
