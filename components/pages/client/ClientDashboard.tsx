import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'

export const ClientDashboard = () => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Dashboard')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)

    return () => {
      setSubHeader('')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Dashboard</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card title="Project Status Table" className="flex max-h-155 flex-1 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.client.id}/tickets`}
              tableQueryKey={['tickets']}
              ofString="Projects"
              rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
            />
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal />
    </>
  )
}
