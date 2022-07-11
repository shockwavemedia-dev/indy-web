import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { ClientTicketsTableColumns } from '../constants/tables/ClientTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const WebsitePage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Website Services')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Website Services</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyLink
          href="/project-brief"
          Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          className="w-fit"
        />
        <div className="flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/websites`}
              tableQueryKey={['websites']}
              ofString="Projects"
            />
          </Card>
          <div className="flex flex-1 flex-col space-y-6">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        website
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        website
      />
    </>
  )
}

WebsitePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default WebsitePage
