import Head from 'next/head'
import { ReactElement } from 'react'
import ClientLayout from '../../layouts/Client.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Client: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Daily Press - Client</title>
    </Head>
  </>
)

Client.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>

export default Client
