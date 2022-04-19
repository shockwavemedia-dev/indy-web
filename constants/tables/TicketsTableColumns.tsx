import axios from 'axios'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import EditIcon from '../../components/common/icons/EditIcon'
import EyeIcon from '../../components/common/icons/EyeIcon'
import TrashIcon from '../../components/common/icons/TrashIcon'
import { Ticket } from '../../types/Ticket.type'

export const TicketsTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'Ticket Code',
    accessor: 'ticketCode',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Subject',
    accessor: 'subject',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Create Date',
    accessor: 'createdAt',
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
            <a className="group">
              <EyeIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
            </a>
          </Link>
          <button onClick={deleteTicket} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <button onClick={deleteTicket} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
        </div>
      )
    },
  },
]
