import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const MarketingPlannerPage: NextPageWithLayout = () => {
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
          <div className="flex w-9/12 flex-col">
            <div className="mb-5 flex w-30">
              <Link href="/new-marketing-planner">
                <Button ariaLabel="Cancel" type="button" className="!bg-forest-green">
                  New Event
                </Button>
              </Link>
            </div>
            <Card className="grid h-155 flex-1 place-items-center transition-all lg:flex-none">
              <div className="">Nothing to see here. 🦗</div>
            </Card>
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

MarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MarketingPlannerPage
