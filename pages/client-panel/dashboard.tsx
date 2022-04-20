import Head from 'next/head'
import { ReactElement, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import CalendarAddIcon from '../../components/common/icons/CalendarAddIcon'
import ClipboardCloseIcon from '../../components/common/icons/ClipboardCloseIcon'
import LifeBuoyIcon from '../../components/common/icons/LifeBuoyIcon'
import PresentationChartIcon from '../../components/common/icons/PresentationChartIcon'
import Card from '../../components/panel/Card'
import FancyButton from '../../components/panel/FancyButton'
import CreateEventModal from '../../components/panel/modals/CreateEventModal'
import CreateSupportRequestModal from '../../components/panel/modals/CreateSupportRequestModal'
import { ClientRoutes } from '../../constants/routes/ClientRoutes'
import { TicketsTableColumns } from '../../constants/tables/TicketsTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => {
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
      <div className="mb-6 flex space-x-6">
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
              <CalendarAddIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Event"
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
        />
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-linen">
              <LifeBuoyIcon className="fill-vivid-red-tangelo" />
            </div>
          }
          title="Create Support Request"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateSupportRequestModal}
        />
      </div>
      <hr className="mb-6 border-t-bright-gray" />
      <div className="mx-auto grid h-262.5 w-270 grid-cols-1 grid-rows-5 gap-6">
        <Card title="All Tickets" className="row-span-3">
          <DataTable
            columns={TicketsTableColumns}
            dataEndpoint="/v1/tickets"
            tableQueryKey="tickets"
            ofString="Tickets"
          />
        </Card>
      </div>
      {/* <Card title="Project Status Table" className="col-span-2 row-span-14">
          <Table
            dataEndpoint="/v1/tickets"
            columns={TicketTableColumns}
            withFilterAndSettings
            tableKey="tickets"
          />
        </Card>
        <div className="col-span-1 row-span-4 flex flex-col space-y-3">
          <div className="flex flex-1 space-x-3">
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
          <div className="flex flex-1 space-x-3">
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
        </div> */}
      {/* <Card title="Notifications" className="col-span-1 row-span-10">
          <div></div>
        </Card>
        <Card title="Number of Projects" className="col-span-2 row-span-9">
          <div></div>
        </Card>
        <Card title="Requests" className="col-span-1 row-span-9">
          <div></div>
        </Card> */}
      <CreateEventModal isVisible={isCreateEventModalVisible} onClose={toggleCreateEventModal} />
      <CreateSupportRequestModal
        isVisible={isCreateSupportRequestModalVisible}
        onClose={toggleCreateSupportRequestModal}
      />
    </>
  )
}

Dashboard.getLayout = (page: ReactElement) => (
  <PanelLayout header="Dashboard" routes={ClientRoutes}>
    {page}
  </PanelLayout>
)

export default Dashboard
