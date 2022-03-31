import Head from 'next/head'
import { ReactElement } from 'react'
import AdminLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Daily Press - Marketing Planning</title>
    </Head>
  </>
)

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
