import Head from 'next/head'
import { ReactElement, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import CalendarAddIcon from '../../components/common/icons/CalendarAddIcon'
import ClipboardCloseIcon from '../../components/common/icons/ClipboardCloseIcon'
import GalleryIcon from '../../components/common/icons/GalleryIcon'
import LifeBuoyIcon from '../../components/common/icons/LifeBuoyIcon'
import MenuBoardIcon from '../../components/common/icons/MenuBoardIcon'
import PresentationChartIcon from '../../components/common/icons/PresentationChartIcon'
import VideoIcon from '../../components/common/icons/VideoIcon'
import Card from '../../components/panel/Card'
import CountCard from '../../components/panel/CountCard'
import FancyButton from '../../components/panel/FancyButton'
import CreateEventModal from '../../components/panel/modals/CreateEventModal'
import CreateSupportRequestModal from '../../components/panel/modals/CreateSupportRequestModal'
import DeleteTicketModal from '../../components/panel/modals/DeleteTicketModal'
import EditTicketModal from '../../components/panel/modals/EditTicketModal'
import { ClientRoutes } from '../../constants/routes/ClientRoutes'
import { TicketsTableColumns } from '../../constants/tables/TicketsTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { useTicketStore } from '../../store/TicketStore'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => {
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateEventModalVisible, setCreateEventModalVisible] = useState(false)
  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateEventModal = () => setCreateEventModalVisible(!isCreateEventModalVisible)
  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Dashboard</div>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="mb-6 flex space-x-6">
          <FancyButton
            Icon={
              <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
                <CalendarAddIcon className="stroke-jungle-green" />
              </div>
            }
            title="New Event"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateEventModal}
          />
          <FancyButton
            Icon={
              <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-alice-blue">
                <ClipboardCloseIcon className="stroke-bleu-de-france" />
              </div>
            }
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
            className="pointer-events-none cursor-default opacity-50"
          />
          <FancyButton
            Icon={
              <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-cosmic-latte">
                <PresentationChartIcon className="stroke-deep-saffron" />
              </div>
            }
            title="Analytics"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
            className="pointer-events-none cursor-default opacity-50"
          />
          <FancyButton
            Icon={
              <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-linen">
                <LifeBuoyIcon className="fill-vivid-red-tangelo" />
              </div>
            }
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateSupportRequestModal}
          />
        </div>
        <hr className="mb-6 border-t-bright-gray" />
        <div className="mb-6 flex min-h-155 space-x-6">
          <Card title="Project Status Table" className="w-full max-w-228">
            <DataTable
              columns={TicketsTableColumns}
              dataEndpoint="/v1/tickets"
              tableQueryKey="tickets"
              ofString="Projects"
              settings
              periodicFilter
            />
          </Card>
          <div className="flex flex-col">
            <div className="mb-3 flex space-x-3">
              <CountCard
                Icon={
                  <div className="flex min-h-11.5 min-w-11.5 items-center justify-center rounded-lg bg-cosmic-latte">
                    <VideoIcon className="stroke-deep-saffron" />
                  </div>
                }
                value={5}
                description="Animations Remaining"
                className="w-36"
              />
              <CountCard
                Icon={
                  <div className="flex min-h-11.5 min-w-11.5 items-center justify-center rounded-lg bg-honeydew">
                    <GalleryIcon className="stroke-jungle-green" />
                  </div>
                }
                value={2}
                description="Photoshoots Remaining"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                Icon={
                  <div className="flex min-h-11.5 min-w-11.5 items-center justify-center rounded-lg bg-alice-blue">
                    <MenuBoardIcon className="stroke-bleu-de-france" />
                  </div>
                }
                value={3}
                description="Marketing Strategy Remaining"
              />
              <CountCard
                Icon={
                  <div className="flex min-h-11.5 min-w-11.5 items-center justify-center rounded-lg bg-magnolia">
                    <VideoIcon className="stroke-purple-x11" />
                  </div>
                }
                value={1}
                description="Videoshoots Remaining"
                className="w-36"
              />
            </div>
            <Card title="Notifications" className="h-full min-w-86 opacity-50">
              <div></div>
            </Card>
          </div>
        </div>
        <div className="flex min-h-102 space-x-6">
          <Card title="Number of Projects" className="w-full max-w-228 opacity-50">
            <></>
          </Card>
          <Card title="Requests" className="min-w-86 opacity-50">
            <></>
          </Card>
        </div>
      </div>
      <CreateEventModal isVisible={isCreateEventModalVisible} onClose={toggleCreateEventModal} />
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

Dashboard.getLayout = (page: ReactElement) => (
  <PanelLayout routes={ClientRoutes}>{page}</PanelLayout>
)

export default Dashboard
