import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { ClientTicketFile } from '../../../components/pages/client/ClientTicketFile'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const TicketPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    query: { id },
  } = useRouter()

  if (session?.isClient) {
    return <ClientTicketFile ticketFileId={Number(id)} />
  }

  return null
}

TicketPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default TicketPage
