import Head from 'next/head'
import { ReactElement } from 'react'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Animations</title>
    </Head>
  </>
)

Animation.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Animation
