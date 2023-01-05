import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { ManagerTicketsTableColumns } from '../../../constants/tables/ManagerTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Client } from '../../../types/Client.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Card } from '../../Card'
import { CheckboxNoFormik } from '../../CheckboxNoFormik'
import { DataTable } from '../../DataTable'
import { TicketPriorityFilter, useTicketPriorityFilter } from '../../filters/TicketPriorityFilter'
import { TicketStatusFilter, useTicketStatusFilter } from '../../filters/TicketStatusFilter'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { SelectNoFormik } from '../../SelectNoFormik'

export const ManagerTicketList = ({
  isPendingJobs = false,
  isNewJobs = false,
}: {
  isPendingJobs: boolean
  isNewJobs: boolean
}) => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const priorities = useTicketPriorityFilter((state) => state.priorities)
  const [clientId, setClientId] = useState(-1)
  const getStatusesAsPayload = useTicketStatusFilter((state) => state.getAsPayload)
  const getPrioritiesAsPayload = useTicketPriorityFilter((state) => state.getAsPayload)
  const [hideClosed, setHideClosed] = useState(false)
  const toggleHideClosedTicket = () => setHideClosed(!hideClosed)

  const { data: clients } = useQuery('clients', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Client>
      page: Page
    }>('/v1/clients?size=500')

    return data
  })

  const clientOptions = clients
    ? clients.map(({ name, id }) => ({
        label: name,
        value: id,
      }))
    : []

  const selectClient = (newValue: SingleValue<SelectOption<number>>) => {
    setClientId(newValue?.value || -1)
  }

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
        <title>Indy - Ticket</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex flex-row gap-6 lg:flex-col">
          <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
            <div className="ml-auto mb-5 flex flex-wrap gap-3">
              <SelectNoFormik
                className="!w-[15rem] rounded-md px-4"
                onChange={selectClient}
                placeholder="Select Client"
                options={clientOptions}
                value={clientOptions.find(({ value }) => value === clientId)}
              />
              {!isPendingJobs && !isNewJobs && (
                <div className="!mt-3">
                  <TicketStatusFilter />
                </div>
              )}
              <div className="!mt-3">
                <TicketPriorityFilter />
              </div>
              {!isPendingJobs && !isNewJobs && (
                <div className="!mt-3">
                  <CheckboxNoFormik
                    label="Hide Closed Ticket"
                    onChange={toggleHideClosedTicket}
                    checked={hideClosed}
                  />
                </div>
              )}
            </div>
            {session && session.user.userType.department ? (
              <DataTable
                columns={ManagerTicketsTableColumns}
                dataEndpoint={
                  isPendingJobs
                    ? `/v1/departments/${session?.user.userType.department.id}/tickets?statuses[0]=pending`
                    : isNewJobs
                    ? `/v1/departments/${session?.user.userType.department.id}/tickets?statuses[0]=new`
                    : `/v1/departments/${session?.user.userType.department.id}/tickets`
                }
                dataParams={{
                  ...getStatusesAsPayload(),
                  ...getPrioritiesAsPayload(),
                  client_id: clientId !== -1 ? clientId : '',
                  hide_closed: hideClosed,
                }}
                tableQueryKey={['tickets', ...statuses, ...priorities, clientId, hideClosed]}
                ofString="Projects"
                rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
              />
            ) : (
              <div className="m-auto w-fit text-base text-metallic-silver">
                No projects to display.
              </div>
            )}
          </Card>
          <Notifications className="w-86 lg:w-1/2" />
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal />
    </>
  )
}
