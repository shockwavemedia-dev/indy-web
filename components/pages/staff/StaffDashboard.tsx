import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { StaffTicketsTableColumns } from '../../../constants/tables/StaffTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'

export const StaffDashboard = () => {
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Dashboard')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)

    return () => {
      setSubHeader('')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Dashboard</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl">
        <Card title="My Tickets">
          <DataTable
            columns={StaffTicketsTableColumns}
            dataEndpoint="/v1/my-tickets"
            tableQueryKey={['tickets']}
            ofString="Projects"
          />
        </Card>
      </div>
    </>
  )
}
