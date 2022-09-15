import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { StaffTicketsTableColumns } from '../../../constants/tables/StaffTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { Notifications } from '../../Notifications'

export const StaffTicketList = () => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Ticket')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)

    return () => {
      setSubHeader('')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Tickets</title>
      </Head>
      <div className="mx-auto flex w-full max-w-8xl gap-6 lg:flex-col">
        <Card title="My Tickets" className="flex flex-1 flex-col">
          <DataTable
            columns={StaffTicketsTableColumns}
            dataEndpoint="/v1/my-tickets"
            tableQueryKey={['tickets']}
            ofString="Projects"
            rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
          />
        </Card>
        <Notifications className="w-86 lg:w-1/2" />
      </div>
    </>
  )
}
