import { useSession } from 'next-auth/react'
import Head from 'next/head'
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
  const { setHeader } = usePanelLayoutStore()

  const [isCreateAnimationModalVisible, setCreateAnimationModalVisible] = useState(false)
  const [isCreateProjectBriefModalVisible, setCreateProjectBriefModalVisible] = useState(false)

  const toggleCreateAnimationModal = () =>
    setCreateAnimationModalVisible(!isCreateAnimationModalVisible)
  const toggleCreateProjectBriefModal = () =>
    setCreateProjectBriefModalVisible(!isCreateProjectBriefModalVisible)

  useEffect(() => {
    setHeader('Animation Library')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Animation Library</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="mb-6 flex space-x-6">
          <FancyButton
            Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateProjectBriefModal}
            className="w-fit"
          />
          <FancyButton
            Icon={<VideoIcon className="stroke-halloween-orange" />}
            title="Request Animation"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateAnimationModal}
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
