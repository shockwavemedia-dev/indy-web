import Head from 'next/head'
import { ReactElement } from 'react'
import Card from '../../components/Admin/Card.component'
import CountCard from '../../components/Admin/CountCard.component'
import AdminLayout from '../../layouts/Admin.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Daily Press - Dashboard</title>
    </Head>
    <div className="mx-auto grid h-300 w-275 grid-cols-6 grid-rows-18 gap-5">
      <Card title="Project Status Table" className="col-span-4 row-span-11">
        <div></div>
      </Card>
      <CountCard value={5} description="Animations Remaining" className="row-span-2" />
      <CountCard value={2} description="Photoshoots Remaining" className="row-span-2" />
      <CountCard value={3} description="Marketing Strategy Remaining" className="row-span-2" />
      <CountCard value={1} description="Videoshoots Remaining" className="row-span-2" />
      <Card title="Notifications" className="col-span-2 row-span-7">
        <div></div>
      </Card>
      <Card title="Number of Projects" className="col-span-4 row-span-7">
        <div></div>
      </Card>
      <Card title="Requests" className="col-span-2 row-span-7">
        <div></div>
      </Card>
    </div>
  </>
)

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
