import Head from 'next/head'
import { ReactElement } from 'react'
import AdminLayout from '../../layouts/App.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const CategoryAnimation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Category Animation</title>
    </Head>
  </>
)

CategoryAnimation.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default CategoryAnimation
