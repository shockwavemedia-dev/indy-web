import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { FancyLink } from '../../FancyLink'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { LifeBuoyIcon } from '../../icons/LifeBuoyIcon'
import { CreateSupportRequestModal } from '../../modals/CreateSupportRequestModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { StatusCountCard } from '../../StatusCountCard'

export const ClientDashboard = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader, setSubHeader } = usePanelLayoutStore()

  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

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
      <div className="mx-auto h-full w-full max-w-8xl">
        <div className="mb-6 flex space-x-6">
          <FancyLink
            href="/project-brief"
            Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            className="w-fit"
          />
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateSupportRequestModal}
            className="w-fit"
          />
        </div>
        <hr className="mb-6 border-t-bright-gray" />
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/tickets`}
              tableQueryKey={['tickets']}
              ofString="Projects"
            />
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-6 grid grid-cols-3 grid-rows-3 gap-3">
              <StatusCountCard
                value={8}
                className="bg-deep-space-sparkle"
                description="Graphics Design"
              />
              <StatusCountCard value={5} className="bg-charleston-green" description="Animations" />
              <StatusCountCard
                value={5}
                className="bg-halloween-orange"
                description="Web Updates"
              />
              <StatusCountCard
                value={8}
                className="bg-maximum-yellow-red"
                description="Photo Shoots"
              />
              <StatusCountCard value={3} className="bg-navy" description="Video Shoots" />
              <StatusCountCard value={11} className="bg-red-crimson" description="Social Posts" />
              <StatusCountCard value={9} className="bg-orchid" description="Marketing" />
              <StatusCountCard value={7} className="bg-forest-green" description="Health Check" />
              <StatusCountCard
                value={15}
                className="bg-bright-navy-blue"
                description="App Updates"
              />
            </div>
            <Notifications />
          </div>
        </div>
      </div>
      <CreateSupportRequestModal
        isVisible={isCreateSupportRequestModalVisible}
        onClose={toggleCreateSupportRequestModal}
      />
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
