import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { CountCard } from '../components/CountCard'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { GalleryIcon } from '../components/icons/GalleryIcon'
import { MenuBoardIcon } from '../components/icons/MenuBoardIcon'
import { VideoIcon } from '../components/icons/VideoIcon'
import { CreateProjectBriefModal } from '../components/modals/CreateProjectBriefModal'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { ClientTicketsTableColumns } from '../constants/tables/ClientTicketsTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const WebsitePage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateProjectBriefModalVisible, setCreateProjectBriefModalVisible] = useState(false)
  const toggleCreateProjectBriefModal = () =>
    setCreateProjectBriefModalVisible(!isCreateProjectBriefModalVisible)

  return (
    <>
      <Head>
        <title>Indy - Website Services</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Website Services</div>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<CalendarAddIcon className="stroke-white" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateProjectBriefModal}
          twBackgroundColor="bg-jungle-green"
          twIconBackgroundColor="bg-illuminating-emerald"
          className="w-fit"
        />
        <div className="flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/websites`}
              tableQueryKey={['websites']}
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
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        website
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        website
      />
    </>
  )
}

WebsitePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default WebsitePage
