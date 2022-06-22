import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { CountCard } from '../../CountCard'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { GalleryIcon } from '../../icons/GalleryIcon'
import { LifeBuoyIcon } from '../../icons/LifeBuoyIcon'
import { MenuBoardIcon } from '../../icons/MenuBoardIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import { CreateSupportRequestModal } from '../../modals/CreateSupportRequestModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'

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
          <Link href="/project-brief">
            <FancyButton
              Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
              title="New Project Brief"
              subtitle="Laborerivit rem cones mil"
              className="w-fit"
            />
          </Link>
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
            <div className="mb-3 flex space-x-3">
              <CountCard
                className="bg-deep-space-sparkle"
                Icon={<VideoIcon className="stroke-white" />}
                value={5}
                description="Animations Remaining"
              />
              <CountCard
                className="bg-charleston-green"
                Icon={<GalleryIcon className="stroke-white" />}
                value={2}
                description="Photoshoots Remaining"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                className="bg-halloween-orange"
                Icon={<MenuBoardIcon className="stroke-white" />}
                value={3}
                description="Graphics Remaining"
              />
              <CountCard
                className="bg-maximum-yellow-red"
                Icon={<VideoIcon className="stroke-white" />}
                value={1}
                description="Videoshoots Remaining"
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
