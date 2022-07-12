import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { GalleryIcon } from '../components/icons/GalleryIcon'
import { LifeBuoyIcon } from '../components/icons/LifeBuoyIcon'
import { CreateGraphicRequestModal } from '../components/modals/CreateGraphicRequestModal'
import { useCreateSupportRequestModalStore } from '../components/modals/CreateSupportRequestModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { ClientTicketsTableColumns } from '../constants/tables/ClientTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const GraphicPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const { setHeader, setButtons } = usePanelLayoutStore()
  const { toggleModal: toggleSupportRequestModal } = useCreateSupportRequestModalStore()

  const [isCreateGraphicModalVisible, setCreateeGraphicModalVisible] = useState(false)

  const toggleCreateGraphicModal = () => setCreateeGraphicModalVisible(!isCreateGraphicModalVisible)

  useEffect(() => {
    setHeader('Graphic Design')

    setButtons(
      <>
        <FancyLink
          href="/project-brief"
          Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          className="w-fit"
        />
        <FancyButton
          Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
          title="Support Request"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleSupportRequestModal}
          className="w-fit"
        />
        <FancyButton
          Icon={<GalleryIcon className="stroke-halloween-orange" />}
          title="Request Graphic"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateGraphicModal}
          className="w-fit"
        />
      </>
    )

    return () => {
      setButtons(
        <>
          <FancyLink
            href="/project-brief"
            Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            className="w-fit"
          />
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleSupportRequestModal}
            className="w-fit"
          />
        </>
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Screen Manager</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card title="Project Status Table" className="flex flex-1 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/graphics`}
              tableQueryKey={['graphics']}
              ofString="Graphics"
            />
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
      <CreateGraphicRequestModal
        isVisible={isCreateGraphicModalVisible}
        onClose={toggleCreateGraphicModal}
      />
    </>
  )
}

GraphicPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default GraphicPage
