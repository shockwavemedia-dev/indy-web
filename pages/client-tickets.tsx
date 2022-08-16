import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { AdminTicketsTableColumns } from '../constants/tables/AdminTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ClientTicketsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  useEffect(() => {
    setHeader('Client Tickets')
  }, [])

  useEffect(() => {
    setHeader('Client Tickets')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Visual Displays</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card title="Project Status Table" className="flex max-h-155 flex-1 flex-col">
            <DataTable
              columns={AdminTicketsTableColumns}
              dataEndpoint={`/v1/tickets`}
              tableQueryKey={['tickets']}
              ofString="Projects"
            />
          </Card>
        </div>
      </div>
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
      />
    </>
  )
}

ClientTicketsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientTicketsPage
