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
import { MenuBoardIcon } from '../../icons/MenuBoardIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import { CreateProjectBriefModal } from '../../modals/CreateProjectBriefModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { NewAnimationRequestModal } from '../../modals/NewAnimationRequestModal'
export const ClientAnimations = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateAnimationModalVisible, setCreateAnimationModalVisible] = useState(false)
  const [isCreateProjectBriefModalVisible, setCreateProjectBriefModalVisible] = useState(false)

  const toggleCreateAnimationModal = () =>
    setCreateAnimationModalVisible(!isCreateAnimationModalVisible)
  const toggleCreateProjectBriefModal = () =>
    setCreateProjectBriefModalVisible(!isCreateProjectBriefModalVisible)

  return (
    <>
      <Head>
        <title>Indy - Animation Library</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Animation Library</div>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
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
            Icon={<VideoIcon className="stroke-white" />}
            title="Request Animation"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateAnimationModal}
            twBackgroundColor="bg-vivid-red-tangelo"
            twIconBackgroundColor="bg-dark-pastel-red"
            className="w-fit"
          />
        </div>
        <hr className="border-t-bright-gray" />
        <div className="flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/libraries`}
              tableQueryKey={['animations']}
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
      <NewAnimationRequestModal
        isVisible={isCreateAnimationModalVisible}
        onClose={toggleCreateAnimationModal}
      />
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        animation
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        animation
      />
    </>
  )
}
