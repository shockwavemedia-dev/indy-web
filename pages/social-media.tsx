import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { SocialMediaTable } from '../components/SocialMediaTable'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const SocialMediaPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex flex-col gap-6 transition-all">
          <Card className="flex max-h-155 flex-1 flex-col">
            <SocialMediaTable />
          </Card>
          <div className="flex w-full gap-6 transition-all">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
    </>
  )
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
