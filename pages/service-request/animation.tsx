import Head from 'next/head'
import { ReactElement } from 'react'
import AdminLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Animations</title>
    </Head>
  </>
)

Animation.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Animation
