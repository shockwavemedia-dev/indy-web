import Head from 'next/head'
import { ReactElement } from 'react'
import Card from '../../components/Admin/Card.component'
import CountCard from '../../components/Admin/CountCard.component'
import GalleryIcon from '../../components/Common/Icons/Gallery.icon'
import MenuBoardIcon from '../../components/Common/Icons/MenuBoard.icon'
import VideoIcon from '../../components/Common/Icons/Video.icon'
import Table from '../../components/Common/Table'
import { TicketTableColumns } from '../../constants/TicketTableColumns'
import AdminLayout from '../../layouts/Admin.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-cols-3 grid-rows-23 gap-6">
        <Card title="Project Status Table" className="col-span-2 row-span-14">
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
        </div>
        <Card title="Notifications" className="col-span-1 row-span-10">
          <div></div>
        </Card>
        <Card title="Number of Projects" className="col-span-2 row-span-9">
          <div></div>
        </Card>
        <Card title="Requests" className="col-span-1 row-span-9">
          <div></div>
        </Card>
      </div>
    </>
  )
}

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
