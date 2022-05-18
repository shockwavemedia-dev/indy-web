import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import ClientTicket from '../../components/pages/client/ClientTicket'
import ManagerTicket from '../../components/pages/manager/ManagerTicket'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Ticket: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    query: { id },
  } = useRouter()

  if (session?.isClient) {
    return <ClientTicket ticketId={Number(id)} />
  } else if (session?.isManager) {
    return <ManagerTicket ticketId={Number(id)} />
  }

  return null
}

Ticket.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Ticket
