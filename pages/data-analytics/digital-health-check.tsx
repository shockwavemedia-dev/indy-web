import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { AnalyticsFileBrowser } from '../../components/AnalyticsFileBrowser'
import { Notifications } from '../../components/Notifications'
import { RetainerInclusions } from '../../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const DigitalHealthCheckAnalyticsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

  useEffect(() => {
    setHeader('Digital Health Check Analytics')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Digital Health Check Analytics</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="flex gap-6 transition-all lg:flex-col">
          <AnalyticsFileBrowser
            clientId={session?.user.userType.client.id || -1}
            menu="Digital Health Check"
          />
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

DigitalHealthCheckAnalyticsPage.getLayout = (page: ReactElement) => (
  <PanelLayout>{page}</PanelLayout>
)

export default DigitalHealthCheckAnalyticsPage
