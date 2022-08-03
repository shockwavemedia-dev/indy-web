import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { AdminTicketFile } from '../../../components/pages/admin/ClientTicketFile'
import { ClientTicketFile } from '../../../components/pages/client/ClientTicketFile'
import { ManagerTicketFile } from '../../../components/pages/manager/ManagerTicketFile'
import { StaffTicketFile } from '../../../components/pages/staff/StaffTicketFile'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const TicketPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    query: { id },
  } = useRouter()

  if (!!session) {
    if (session.isClient) {
      return <ClientTicketFile ticketFileId={Number(id)} />
    } else if (session.isManager) {
      return <ManagerTicketFile ticketFileId={Number(id)} />
    } else if (session.isStaff) {
      return <StaffTicketFile ticketFileId={Number(id)} />
    } else if (session.isAdmin) {
      return <AdminTicketFile ticketFileId={Number(id)} />
    }
  }

  return null
}

TicketPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default TicketPage
