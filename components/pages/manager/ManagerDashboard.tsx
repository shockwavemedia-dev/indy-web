import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ManagerTicketsTableColumns } from '../../../constants/tables/ManagerTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { TicketPriorityFilter, useTicketPriorityFilter } from '../../filters/TicketPriorityFilter'
import { TicketStatusFilter, useTicketStatusFilter } from '../../filters/TicketStatusFilter'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'

export const ManagerDashboard = () => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const priorities = useTicketPriorityFilter((state) => state.priorities)
  const getStatusesAsPayload = useTicketStatusFilter((state) => state.getAsPayload)
  const getPrioritiesAsPayload = useTicketPriorityFilter((state) => state.getAsPayload)

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
      <div className="mx-auto w-full space-y-6">
        <div className="flex flex-row gap-6 lg:flex-col">
          <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
            <div className="ml-auto mb-5 flex flex-wrap gap-3">
              <TicketStatusFilter />
              <TicketPriorityFilter />
            </div>
            {session && session.user.userType.department ? (
              <DataTable
                columns={ManagerTicketsTableColumns}
                dataEndpoint={`/v1/departments/${session?.user.userType.department.id}/tickets`}
                dataParams={{
                  ...getStatusesAsPayload(),
                  ...getPrioritiesAsPayload(),
                }}
                tableQueryKey={['tickets', ...statuses, ...priorities]}
                ofString="Projects"
                rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
              />
            ) : (
              <div className="m-auto w-fit text-base text-metallic-silver">
                No projects to display.
              </div>
            )}
          </Card>
          <Notifications className="w-86 lg:w-1/2" />
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal />
    </>
  )
}
