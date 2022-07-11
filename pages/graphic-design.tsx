import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { GalleryIcon } from '../components/icons/GalleryIcon'
import { CreateGraphicRequestModal } from '../components/modals/CreateGraphicRequestModal'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { ClientTicketsTableColumns } from '../constants/tables/ClientTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const GraphicPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader } = usePanelLayoutStore()

  const [isCreateGraphicModalVisible, setCreateeGraphicModalVisible] = useState(false)

  const toggleCreateGraphicModal = () => setCreateeGraphicModalVisible(!isCreateGraphicModalVisible)

  useEffect(() => {
    setHeader('Graphic Design')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Graphic Design</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="mb-6 flex space-x-6">
          <FancyLink
            href="/project-brief"
            Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            className="w-fit"
          />
          <FancyButton
            Icon={<GalleryIcon className="stroke-halloween-orange" />}
            title="Request Graphic"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateGraphicModal}
            className="w-fit"
          />
        </div>
        <hr className="border-t-bright-gray" />
        <div className="flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/graphics`}
              tableQueryKey={['graphics']}
              ofString="Projects"
            />
          </Card>
          <div className="flex flex-1 flex-col space-y-6">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
      <CreateGraphicRequestModal
        isVisible={isCreateGraphicModalVisible}
        onClose={toggleCreateGraphicModal}
      />
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        graphic
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        graphic
      />
    </>
  )
}

GraphicPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default GraphicPage
