import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { AdminTicketsTableColumns } from '../constants/tables/AdminTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ClientTicketsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { replace } = useRouter()

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
              rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
            />
          </Card>
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal />
    </>
  )
}

ClientTicketsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientTicketsPage