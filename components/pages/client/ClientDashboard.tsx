import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
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
import { CreateProjectBriefModal } from '../../modals/CreateProjectBriefModal'
import { CreateSupportTicketModal } from '../../modals/CreateSupportTicketModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
export const ClientDashboard = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateProjectBriefModalVisible, setCreateProjectBriefModalVisible] = useState(false)
  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateProjectBriefModal = () =>
    setCreateProjectBriefModalVisible(!isCreateProjectBriefModalVisible)
  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

  return (
    <>
      <Head>
        <title>Indy - Dashboard</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Dashboard</div>
      <div className="mx-auto h-full w-full max-w-8xl">
        <div className="mb-6 flex space-x-6">
          <FancyButton
            Icon={<CalendarAddIcon className="stroke-white" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateProjectBriefModal}
            twBackgroundColor="bg-jungle-green"
            twIconBackgroundColor="bg-illuminating-emerald"
            className="w-fit"
          />
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-white" />}
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateSupportRequestModal}
            twBackgroundColor="bg-vivid-red-tangelo"
            twIconBackgroundColor="bg-dark-pastel-red"
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
                Icon={<VideoIcon className="stroke-white" />}
                value={5}
                description="Animations Remaining"
                className="w-36"
                twBackgroundColor="bg-vivid-red-tangelo"
                twIconBackgroundColor="bg-dark-pastel-red"
              />
              <CountCard
                Icon={<GalleryIcon className="stroke-white" />}
                value={2}
                description="Photoshoots Remaining"
                twBackgroundColor="bg-jungle-green"
                twIconBackgroundColor="bg-illuminating-emerald"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                Icon={<MenuBoardIcon className="stroke-white" />}
                value={3}
                description="Graphics Remaining"
                twBackgroundColor="bg-bleu-de-france"
                twIconBackgroundColor="bg-bright-navy-blue"
              />
              <CountCard
                Icon={<VideoIcon className="stroke-white" />}
                value={1}
                description="Videoshoots Remaining"
                className="w-36"
                twBackgroundColor="bg-purple-x11"
                twIconBackgroundColor="bg-dark-orchid"
              />
            </div>
            <Card title="Notifications" className="h-full w-full opacity-50">
              <div></div>
            </Card>
          </div>
        </div>
      </div>
      <CreateProjectBriefModal
        isVisible={isCreateProjectBriefModalVisible}
        onClose={toggleCreateProjectBriefModal}
      />
      <CreateSupportTicketModal
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
