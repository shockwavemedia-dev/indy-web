import Head from 'next/head'
import { StaffTicketsTableColumns } from '../../../constants/tables/StaffTicketsTableColumns'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'

export const StaffDashboard = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Dashboard</div>
      <div className="mx-auto h-full w-full max-w-8xl">
        <Card title="My Tickets">
          <DataTable
            columns={StaffTicketsTableColumns}
            dataEndpoint="/v1/my-tickets"
            tableQueryKey={['tickets']}
            ofString="Projects"
            settings
          />
        </Card>
      </div>
    </>
  )
}
