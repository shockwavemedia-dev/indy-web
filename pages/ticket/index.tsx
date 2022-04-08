import Head from 'next/head'
import { ReactElement } from 'react'
import Table from '../../components/Common/Table'
import Card from '../../components/Panel/Card.component'
import { TicketTableColumns } from '../../constants/TicketTableColumns'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Ticket: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Ticket</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-cols-1 grid-rows-5 gap-6">
        <Card title="All Tickets" className="row-span-3">
          <Table
            columns={TicketTableColumns}
            dataEndpoint="/v1/tickets"
            tableQueryKey="tickets"
            withFilterAndSettings
            ofString="Tickets"
          />
        </Card>
      </div>
    </>
  )
}

Ticket.getLayout = (page: ReactElement) => <PanelLayout header="Tickets">{page}</PanelLayout>

export default Ticket
