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
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="My Tickets" className="flex w-full flex-col">
            <DataTable
              columns={StaffTicketsTableColumns}
              dataEndpoint="/v1/my-tickets"
              tableQueryKey={['tickets']}
              ofString="Projects"
              settings
              periodicFilter
            />
          </Card>
        </div>
      </div>
    </>
  )
}
