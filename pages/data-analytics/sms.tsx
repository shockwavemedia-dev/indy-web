import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { AnalyticsFileBrowser } from '../../components/AnalyticsFileBrowser'
import { Notifications } from '../../components/Notifications'
import { RetainerInclusions } from '../../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const SmsAnalyticsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

  useEffect(() => {
    setHeader('SMS Analytics')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - SMS Analytics</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="flex gap-6 transition-all lg:flex-col">
          <AnalyticsFileBrowser clientId={session?.user.userType.client.id || -1} menu="SMS" />
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

SmsAnalyticsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SmsAnalyticsPage
