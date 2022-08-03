import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { AdminTicket } from '../../components/pages/admin/AdminTicket'
import { ClientTicket } from '../../components/pages/client/ClientTicket'
import { ManagerTicket } from '../../components/pages/manager/ManagerTicket'
import { StaffTicket } from '../../components/pages/staff/StaffTicket'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const TicketPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    query: { id },
  } = useRouter()

  if (session?.isClient) {
    return <ClientTicket ticketId={Number(id)} />
  } else if (session?.isManager) {
    return <ManagerTicket ticketId={Number(id)} />
  } else if (session?.isStaff) {
    return <StaffTicket ticketId={Number(id)} />
  } else if (session?.isAdmin) {
    return <AdminTicket ticketId={Number(id)} />
  }

  return null
}

TicketPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default TicketPage
