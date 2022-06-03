import { format } from 'date-fns'
import Link from 'next/link'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { EyeIcon } from '../../components/icons/EyeIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import { useTicketStore } from '../../store/TicketStore'
import { Ticket } from '../../types/Ticket.type'

export const ClientTicketsTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'ID',
    accessor: 'id',
    id: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Client',
    accessor: 'clientName',
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
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'closed' || 'resolved':
              return 'bg-jungle-green'
            case 'new' || 'open':
              return 'bg-bleu-de-france'
            case 'pending':
              return 'bg-tart-orange'
            case 'on hold':
              return 'bg-deep-saffron'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'Created',
    accessor: 'createdAt',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
  {
    Header: 'Deadline',
    accessor: 'duedate',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
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
          <Link href={`/ticket/${ticket.id}`}>
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
