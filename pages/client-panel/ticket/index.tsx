import Head from 'next/head'
import { ReactElement, useState } from 'react'
import DataTable from '../../../components/common/DataTable'
import PlusIcon from '../../../components/common/icons/PlusIcon'
import Card from '../../../components/panel/Card'
import CreateEventModal from '../../../components/panel/modals/CreateEventModal'
import CreateSupportRequestModal from '../../../components/panel/modals/CreateSupportRequestModal'
import { ClientRoutes } from '../../../constants/routes/ClientRoutes'
import { TicketsTableColumns } from '../../../constants/tables/TicketsTableColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const Ticket: NextPageWithLayout = () => {
  const [isCreateEventModalVisible, setCreateEventModalVisible] = useState(false)
  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateEventModal = () => setCreateEventModalVisible(!isCreateEventModalVisible)
  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Tickets</title>
      </Head>
      <Card title="All Tickets" className="mx-auto h-full w-full max-w-7xl">
        <DataTable
          columns={TicketsTableColumns}
          dataEndpoint="/v1/tickets"
          tableQueryKey="tickets"
          ofString="Tickets"
          tableActions={
            <>
              <button className="mr-8 flex items-center space-x-2" onClick={toggleCreateEventModal}>
                <PlusIcon className="stroke-jungle-green" />
                <div className="font-urbanist text-sm font-semibold text-jungle-green">
                  Create Event
                </div>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={toggleCreateSupportRequestModal}
              >
                <PlusIcon className="stroke-jungle-green" />
                <div className="font-urbanist text-sm font-semibold text-jungle-green">
                  Create Support Request
                </div>
              </button>
            </>
          }
        />
      </Card>
      <CreateEventModal isVisible={isCreateEventModalVisible} onClose={toggleCreateEventModal} />
      <CreateSupportRequestModal
        isVisible={isCreateSupportRequestModalVisible}
        onClose={toggleCreateSupportRequestModal}
      />
    </>
  )
}

Ticket.getLayout = (page: ReactElement) => (
  <PanelLayout header="Tickets" routes={ClientRoutes}>
    {page}
  </PanelLayout>
)

export default Ticket
