import { format } from 'date-fns'
import Link from 'next/link'
import { Column } from 'react-table'
import EditIcon from '../../components/common/icons/EditIcon'
import EyeIcon from '../../components/common/icons/EyeIcon'
import TrashIcon from '../../components/common/icons/TrashIcon'
import { useTicketStore } from '../../store/TicketStore'
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
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
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
    Cell: ({ row: { original: ticket } }) => {
      const { setActiveTicket, toggleEditTicketModal, toggleDeleteTicketModal } = useTicketStore()

      const editTicket = () => {
        setActiveTicket(ticket)
        toggleEditTicketModal()
      }

      const deleteTicket = () => {
        setActiveTicket(ticket)
        toggleDeleteTicketModal()
      }

      return (
        <div className="flex space-x-2">
          <Link href={`/client-panel/ticket/${ticket.id}`}>
            <a className="group">
              <EyeIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
            </a>
          </Link>
          <button onClick={editTicket} className="group">
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
