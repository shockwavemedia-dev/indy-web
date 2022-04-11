import axios from 'axios'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import EyeOpenIcon from '../components/Common/Icons/EyeOpen.icon'
import TrashIcon from '../components/Common/Icons/Trash.icon'
import Link from '../components/Common/Link.component'
import { Ticket } from '../types/Ticket.type'

export const TicketTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'Ticket Code',
    accessor: 'ticketCode',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Subject',
    accessor: 'subject',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <div
        className={`w-fit rounded-lg bg-honeydew py-1 px-2 font-urbanist text-sm font-medium text-jungle-green`}
      >
        {value}
      </div>
    ),
  },
  {
    Header: 'Due Date',
    accessor: 'duedate',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ value }) => {
      const { data: session } = useSession()
      const queryClient = useQueryClient()

      const deleteTicket = async () => {
        const { status } = await axios.delete(`/v1/tickets/${value}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        })

        if (status === 200) {
          queryClient.invalidateQueries('tickets')
        }
      }

      return (
        <div className="flex space-x-2">
          <Link href={`/ticket/${value}`}>
            <EyeOpenIcon className="stroke-waterloo" />
          </Link>
          <button onClick={deleteTicket}>
            <TrashIcon className="stroke-waterloo" />
          </button>
        </div>
      )
    },
  },
]
