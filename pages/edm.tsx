import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../components/Card'
import { CountCard } from '../components/CountCard'
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { Edm } from '../types/EDM.type'

import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const EDMPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

  const { data: edm } = useQuery('edm', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Edm>
      page: Page
    }>(`/v1/clients/${session?.user.userType.clientId}/edm`)

    return data
  })

  useEffect(() => {
    setHeader('EDM')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - EDM</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-full flex-1 place-items-center transition-all lg:flex-none">
            <div className="flex flex-col">
              {edm?.map(({ name, membersCount, opens, clicks }, index) => (
                <Card
                  key={`edm-${index}`}
                  className="mb-8 w-full rounded-xl border border-halloween-orange"
                  title={name}
                  titlePosition="center"
                >
                  <div className="mb-3 flex space-x-3">
                    <CountCard
                      Icon={
                        <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-cosmic-latte text-onyx">
                          <UserIcon className="stroke-deep-saffron" />
                        </div>
                      }
                      value={membersCount}
                      description="Members Count"
                      className="w-40"
                    />
                    <CountCard
                      Icon={
                        <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-honeydew">
                          <MagnifyingGlassIcon className="stroke-jungle-green" />
                        </div>
                      }
                      value={opens}
                      description="Opens"
                      className="w-40"
                    />
                    <CountCard
                      Icon={
                        <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-alice-blue">
                          <MonitorIcon className="stroke-bleu-de-france" />
                        </div>
                      }
                      value={clicks}
                      description="Click"
                      className="w-40"
                    />
                  </div>
                </Card>
              ))}
            </div>
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

EDMPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default EDMPage
