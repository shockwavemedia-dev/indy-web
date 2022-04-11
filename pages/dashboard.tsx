import Head from 'next/head'
import { ReactElement, useState } from 'react'
import CalendarAddIcon from '../components/common/icons/CalendarAddIcon'
import ClipboardCloseIcon from '../components/common/icons/ClipboardCloseIcon'
import LifeBuoyIcon from '../components/common/icons/LifeBuoyIcon'
import PresentationChartIcon from '../components/common/icons/PresentationChartIcon'
import Table from '../components/common/Table'
import Card from '../components/panel/Card.component'
import FancyButton from '../components/panel/FancyButton.component'
import NewEventModal from '../components/panel/NewEventModal.component'
import NewProjectBriefModal from '../components/panel/NewProjectBriefModal.component'
import SupportRequestModal from '../components/panel/SupportRequestModal.component'
import { TicketTableColumns } from '../constants/tables/TicketTableColumns'
import PanelLayout from '../layouts/Panel.layout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => {
  const [isNewEventModalVisible, setNewEventModalVisible] = useState(false)
  const [isNewProjectBriefModalVisible, setNewProjectBriefModalVisible] = useState(false)
  const [isSupportRequestModalVisible, setSupportRequestModalVisible] = useState(false)

  const toggleNewEventModal = () => setNewEventModalVisible(!isNewEventModalVisible)
  const toggleNewProjectBriefModal = () =>
    setNewProjectBriefModalVisible(!isNewProjectBriefModalVisible)
  const toggleSupportRequestModal = () =>
    setSupportRequestModalVisible(!isSupportRequestModalVisible)

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
          title="New Event"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewEventModal}
        />
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-alice-blue">
              <ClipboardCloseIcon className="stroke-bleu-de-france" />
            </div>
          }
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewProjectBriefModal}
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
          title="Support Request"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleSupportRequestModal}
        />
      </div>
      <hr className="mb-6 border-t-bright-gray" />
      <div className="mx-auto grid h-262.5 w-270 grid-cols-1 grid-rows-5 gap-6">
        <Card title="All Tickets" className="row-span-3">
          <Table
            columns={TicketTableColumns}
            dataEndpoint="/v1/tickets"
            tableQueryKey="tickets"
            withFilterAndSettings
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
      <NewEventModal isVisible={isNewEventModalVisible} onClose={toggleNewEventModal} />
      <NewProjectBriefModal
        isVisible={isNewProjectBriefModalVisible}
        onClose={toggleNewProjectBriefModal}
      />
      <SupportRequestModal
        isVisible={isSupportRequestModalVisible}
        onClose={toggleSupportRequestModal}
      />
    </>
  )
}

Dashboard.getLayout = (page: ReactElement) => <PanelLayout header="Dashboard">{page}</PanelLayout>

export default Dashboard
