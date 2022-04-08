import axios from 'axios'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import ClipboardIcon from '../../components/Common/Icons/Clipboard.icon'
import Select from '../../components/Common/Select.component'
import Table from '../../components/Common/Table'
import Card from '../../components/Panel/Card.component'
import TicketAssigneeModal from '../../components/Panel/TicketAssigneeModal.component'
import { TicketAssigneeTableColumns } from '../../constants/TicketAssigneeTableColumns'
import { TicketStatusOptions } from '../../constants/TicketStatusOptions'
import { Client } from '../../interfaces/Client.interface'
import { Option } from '../../interfaces/Option.interface'
import { Ticket } from '../../interfaces/Ticket.interface'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Ticket: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const {
    query: { id },
  } = useRouter()

  const {
    data: ticket,
    isLoading: ticketLoading,
    isFetching: ticketFetching,
  } = useQuery(['ticket', { ticketId: id }], async () => {
    const { data } = await axios.get<Ticket>(`/v1/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const {
    data: client,
    isLoading: clientLoading,
    isFetching: clientFetching,
  } = useQuery(
    ['client', ticket?.clientId],
    async () => {
      const { data } = await axios.get<Client>(`/v1/clients/${ticket?.clientId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      return data
    },
    {
      enabled: !!ticket,
    }
  )

  const [isTicketAssigneeModalVisible, setTicketAssigneeModalVisible] = useState(false)

  const toggleTicketAssigneeModal = () =>
    setTicketAssigneeModalVisible(!isTicketAssigneeModalVisible)

  const updateStatus = async (newStatus: SingleValue<Option>) => {
    const { status, data: updatedTicket } = await axios.put<Ticket>(
      `/v1/tickets/${id}/status`,
      {
        status: newStatus?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    if (status === 200) {
      queryClient.setQueryData(['ticket', { ticketId: id }], updatedTicket)
    }
  }

  const loadingData = ticketLoading || clientLoading

  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <Card
        title={`Ticket ${loadingData ? 'loading...' : `${ticket?.ticketCode}`}`}
        className="mx-auto mb-6 h-[280px] w-[750px]"
      >
        <div className="grid grid-cols-2 grid-rows-3 gap-6">
          <div className="space-y-1">
            <div
              className={`font-urbanist text-sm font-bold text-onyx ${
                loadingData && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              Company
            </div>
            <div
              className={`font-urbanist text-sm font-medium text-waterloo ${
                loadingData &&
                'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              {!loadingData && client?.name}
            </div>
          </div>
          <div className="space-y-1">
            <div
              className={`font-urbanist text-sm font-bold text-onyx ${
                loadingData && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              Type
            </div>
            <div
              className={`font-urbanist text-sm font-medium text-waterloo ${
                loadingData &&
                'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              {!loadingData && ticket?.type}
            </div>
          </div>
          <div className="space-y-1">
            <div
              className={`font-urbanist text-sm font-bold text-onyx ${
                loadingData && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              Subject
            </div>
            <div
              className={`font-urbanist text-sm font-medium text-waterloo ${
                loadingData &&
                'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              {!loadingData && ticket?.subject}
            </div>
          </div>
          <div className="space-y-1">
            <div
              className={`font-urbanist text-sm font-bold text-onyx ${
                loadingData && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              Created At
            </div>
            <div
              className={`font-urbanist text-sm font-medium text-waterloo ${
                loadingData &&
                'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              {!loadingData && ticket?.createdAt && format(ticket?.createdAt, 'P')}
            </div>
          </div>
          <div className="col-span-2 space-y-1">
            <div
              className={`font-urbanist text-sm font-bold text-onyx ${
                loadingData && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              Description
            </div>
            <div
              className={`font-urbanist text-sm font-medium text-waterloo ${
                loadingData &&
                'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
              }`}
            >
              {!loadingData && ticket?.description}
            </div>
          </div>
        </div>
      </Card>
      <Card title="Ticket Status" className="mx-auto mb-6 w-[750px]">
        <Select
          key={`ticket${id}${ticket?.status}`}
          Icon={ClipboardIcon}
          options={TicketStatusOptions}
          defaultValue={TicketStatusOptions.find(({ value }) => value === ticket?.status)}
          onChange={updateStatus}
          functional
        />
      </Card>
      <Card title="Ticket Assignees" className="mx-auto w-[750px]">
        <Table
          columns={TicketAssigneeTableColumns}
          dataEndpoint={`/v1/tickets/${id}/assignees`}
          tableQueryKey="assignees"
          ofString="Assignees"
          tableAction={
            <button className="flex items-center space-x-2" onClick={toggleTicketAssigneeModal}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12"
                  stroke="#2BB67D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12V4"
                  stroke="#2BB67D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="font-urbanist text-sm font-semibold text-jungle-green">
                Add new ticket assignee
              </div>
            </button>
          }
        />
      </Card>
      {ticket && (
        <TicketAssigneeModal
          isVisible={isTicketAssigneeModalVisible}
          onClose={toggleTicketAssigneeModal}
          ticketId={id}
        />
      )}
    </>
  )
}

Ticket.getLayout = (page: ReactElement) => <PanelLayout header="Tickets">{page}</PanelLayout>

export default Ticket
