import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { LifeBuoyIcon } from '../components/icons/LifeBuoyIcon'
import {
  CreateSupportTicketModal,
  useCreateSupportTicketModalStore,
} from '../components/modals/CreateSupportTicketModal'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { AdminTicketsTableColumns } from '../constants/tables/AdminTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ClientTicketsPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { toggleModal: toggleSupportTicketModal } = useCreateSupportTicketModalStore()

  useEffect(() => {
    setHeader('Client Tickets')
    if (session?.user.userType.role === 'admin') {
      setButtons(
        <>
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
            title="New Ticket"
            subtitle=""
            onClick={(e) => {
              e.stopPropagation()
              toggleSupportTicketModal(-1)
            }}
            className="w-fit"
          />
        </>
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Visual Displays</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
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
      <CreateSupportTicketModal />
    </>
  )
}

ClientTicketsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientTicketsPage
