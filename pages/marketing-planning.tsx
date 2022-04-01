import Head from 'next/head'
import { ReactElement } from 'react'
import PanelLayout from '../layouts/Panel.layout'
import { NextPageWithLayout } from '../types/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Daily Press - Marketing Planning</title>
    </Head>
  </>
)

Dashboard.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Dashboard
