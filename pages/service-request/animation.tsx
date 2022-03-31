import Head from 'next/head'
import { ReactElement } from 'react'
import AppLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Animations</title>
    </Head>
  </>
)

Animation.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default Animation
