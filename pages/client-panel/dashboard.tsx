import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Card from '../../components/Card'
import CountCard from '../../components/CountCard'
import DataTable from '../../components/DataTable'
import FancyButton from '../../components/FancyButton'
import CalendarAddIcon from '../../components/icons/CalendarAddIcon'
import ClipboardCloseIcon from '../../components/icons/ClipboardCloseIcon'
import GalleryIcon from '../../components/icons/GalleryIcon'
import LifeBuoyIcon from '../../components/icons/LifeBuoyIcon'
import MenuBoardIcon from '../../components/icons/MenuBoardIcon'
import PresentationChartIcon from '../../components/icons/PresentationChartIcon'
import VideoIcon from '../../components/icons/VideoIcon'
import CreateEventModal from '../../components/modals/CreateEventModal'
import CreateSupportRequestModal from '../../components/modals/CreateSupportRequestModal'
import DeleteTicketModal from '../../components/modals/DeleteTicketModal'
import EditTicketModal from '../../components/modals/EditTicketModal'
import { ClientRoutes } from '../../constants/routes/ClientRoutes'
import { ClientTicketsTableColumns } from '../../constants/tables/ClientTicketsTableColumns'
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
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
                <CalendarAddIcon className="stroke-jungle-green" />
              </div>
            }
            title="New Event"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateEventModal}
          />
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-alice-blue">
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
              <div className="bas grid h-11 w-11 flex-none place-items-center rounded-lg bg-cosmic-latte">
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
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-linen">
                <LifeBuoyIcon className="fill-vivid-red-tangelo" />
              </div>
            }
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateSupportRequestModal}
          />
        </div>
        <hr className="mb-6 border-t-bright-gray" />
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-228 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint="/v1/tickets"
              tableQueryKey={['tickets']}
              ofString="Projects"
              settings
              periodicFilter
            />
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex space-x-3">
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-cosmic-latte">
                    <VideoIcon className="stroke-deep-saffron" />
                  </div>
                }
                value={5}
                description="Animations Remaining"
                className="w-36"
              />
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-honeydew">
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
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-alice-blue">
                    <MenuBoardIcon className="stroke-bleu-de-france" />
                  </div>
                }
                value={3}
                description="Marketing Strategy Remaining"
              />
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-magnolia">
                    <VideoIcon className="stroke-purple-x11" />
                  </div>
                }
                value={1}
                description="Videoshoots Remaining"
                className="w-36"
              />
            </div>
            <Card title="Notifications" className="h-full w-full opacity-50">
              <div></div>
            </Card>
          </div>
        </div>
        <div className="flex h-102 space-x-6">
          <Card title="Number of Projects" className="w-228 opacity-50">
            <></>
          </Card>
          <Card title="Requests" className="flex-1 opacity-50">
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
