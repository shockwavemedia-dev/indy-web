import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { ManagerTicketsTableColumns } from '../../../constants/tables/ManagerTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'

export const ManagerDashboard = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
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
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex flex-row gap-6 lg:flex-col">
          <Card title="Project Status Table" className="flex max-h-155 flex-1 flex-col">
            {session && session.user.userType.department ? (
              <DataTable
                columns={ManagerTicketsTableColumns}
                dataEndpoint={`/v1/departments/${session?.user.userType.department.id}/tickets`}
                tableQueryKey={['tickets']}
                ofString="Projects"
              />
            ) : (
              <div className="m-auto w-fit text-base text-metallic-silver">
                No projects to display. 😶
              </div>
            )}
          </Card>
          <Notifications className="w-86 lg:w-1/2" />
        </div>
      </div>
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
      />
    </>
  )
}
