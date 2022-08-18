import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import { useTicketStore } from '../../store/TicketStore'
import { Ticket } from '../../types/Ticket.type'

export const ManagerTicketsTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'Client',
    accessor: 'clientName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Code',
    accessor: 'ticketCode',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'email':
              return 'bg-light-red-crimson'
            case 'library':
              return 'bg-light-golden-rod'
            case 'event':
              return 'bg-light-navy'
            case 'graphic':
              return 'bg-light-forest-green'
            case 'print':
              return 'bg-light-orange'
            case 'task':
              return 'bg-light-orchid'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'email':
              return 'text-red-crimson'
            case 'library':
              return 'text-golden-rod'
            case 'event':
              return 'text-navy'
            case 'graphic':
              return 'text-forest-green'
            case 'print':
              return 'text-orange'
            case 'task':
              return 'text-orchid'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'Subject',
    accessor: 'subject',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'closed':
              return 'bg-light-navy'
            case 'resolved':
              return 'bg-honeydew'
            case 'open':
              return 'bg-light-golden-rod'
            case 'new':
              return 'bg-alice-blue'
            case 'pending':
              return 'bg-light-tart-orange'
            case 'on hold':
              return 'bg-light-deep-saffron'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'closed':
              return 'text-navy'
            case 'resolved':
              return 'text-jungle-green'
            case 'open':
              return 'text-golden-rod'
            case 'new':
              return 'text-bleu-de-france'
            case 'pending':
              return 'text-tart-orange'
            case 'on hold':
              return 'text-deep-saffron'
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
      <div className=" text-sm font-medium text-onyx">{format(value, "yy MMM''dd")}</div>
    ),
  },
  {
    Header: 'Deadline',
    accessor: 'duedate',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className=" text-sm font-medium text-onyx">{format(value, "yy MMM''dd")}</div>
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
        <div className="invisible flex space-x-2 group-hover:visible">
          <Tooltip title="Edit Ticket" placement="top">
            <button onClick={editTicket}>
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Delete Ticket" placement="top">
            <button onClick={deleteTicket}>
              <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]
