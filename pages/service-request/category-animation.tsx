import Head from 'next/head'
import { ReactElement } from 'react'
import AppLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const CategoryAnimation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Category Animation</title>
    </Head>
  </>
)

CategoryAnimation.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default CategoryAnimation
