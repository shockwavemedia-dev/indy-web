import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { AnalyticsFileBrowser } from '../../components/AnalyticsFileBrowser'
import { Notifications } from '../../components/Notifications'
import { RetainerInclusions } from '../../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const FAndBAnalyticsPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const { data: session } = useSession()

  useEffect(() => {
    setHeader('F&B Analytics')
    setCrumbsNavigation([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - F&B Analytics</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="flex gap-6 transition-all lg:flex-col">
          <AnalyticsFileBrowser clientId={session?.user.userType.client.id || -1} menu="F%26B" />
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

FAndBAnalyticsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default FAndBAnalyticsPage
