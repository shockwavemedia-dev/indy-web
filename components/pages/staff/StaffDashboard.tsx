import Head from 'next/head'
import { StaffTicketsTableColumns } from '../../../constants/tables/StaffTicketsTableColumns'
import Card from '../../Card'
import CountCard from '../../CountCard'
import DataTable from '../../DataTable'
import GalleryIcon from '../../icons/GalleryIcon'
import MenuBoardIcon from '../../icons/MenuBoardIcon'
import VideoIcon from '../../icons/VideoIcon'
const StaffDashboard = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Dashboard</div>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="My Tickets" className="flex w-228 flex-col">
            <DataTable
              columns={StaffTicketsTableColumns}
              dataEndpoint={`/v1/my-tickets`}
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
    </>
  )
}

export default StaffDashboard
