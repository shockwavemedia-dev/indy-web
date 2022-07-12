import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PhotographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Photography')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Photography</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-155 flex-1 place-items-center transition-all lg:flex-none">
            <div className="">Nothing to see here. 🦗</div>
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

PhotographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PhotographyPage
