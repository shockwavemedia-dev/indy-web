import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { MarketingPlannerChart } from '../../components/charts/MarketingPlannerChart'
import { LinkButton } from '../../components/LinkButton'
import { Notifications } from '../../components/Notifications'
import { RetainerInclusions } from '../../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const MarketingPlannersPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Marketing Planner')
  }, [])

  return (
    <>
      <Head>
        <title>Marketing Planner</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex gap-6 transition-all lg:flex-col">
          <div className="flex-1">
            <LinkButton title="New Event" href="/new-marketing-planner" className="mb-5 w-30" />
            <MarketingPlannerChart />
          </div>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

MarketingPlannersPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MarketingPlannersPage
