import Head from 'next/head'
import { ReactElement } from 'react'
import PlusIcon from '../../../components/common/icons/PlusIcon'
import Table from '../../../components/common/Table'
import Card from '../../../components/panel/Card'
import { ClientRoutes } from '../../../constants/routes/ClientRoutes'
import { TicketsTableColumns } from '../../../constants/tables/TicketsTableColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const Ticket: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Daily Press - Tickets</title>
    </Head>
    <Card title="All Tickets" className="h-full">
      <Table
        columns={TicketsTableColumns}
        dataEndpoint="/v1/tickets"
        tableQueryKey="tickets"
        ofString="Tickets"
        tableActions={
          <button className="flex items-center space-x-2">
            <PlusIcon className="stroke-jungle-green" />
            <div className="font-urbanist text-sm font-semibold text-jungle-green">
              Create New Ticket
            </div>
          </button>
        }
      />
    </Card>
  </>
)

Ticket.getLayout = (page: ReactElement) => (
  <PanelLayout header="Tickets" routes={ClientRoutes}>
    {page}
  </PanelLayout>
)

export default Ticket
