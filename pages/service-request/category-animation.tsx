import Head from 'next/head'
import { ReactElement } from 'react'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const CategoryAnimation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Category Animation</title>
    </Head>
  </>
)

CategoryAnimation.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default CategoryAnimation
