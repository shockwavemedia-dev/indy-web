import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import { Column } from 'react-table'
import { DocumentCheckIcon } from '../../components/icons/DocumentCheckIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useDeleteTicketModal } from '../../components/modals/DeleteTicketModal'
import { useEditTicketModal } from '../../components/modals/EditTicketModal'
import { Pill } from '../../components/Pill'
import { Ticket } from '../../types/Ticket.type'

export const ClientTicketsTableColumns: Array<Column<Ticket>> = [
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
            case 'project':
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
            case 'project':
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
              return 'bg-honeydew'
            case 'open':
              return 'bg-light-golden-rod'
            case 'new':
              return 'bg-alice-blue'
            case 'pending':
              return 'bg-light-tart-orange'
            case 'in_progress':
              return 'bg-light-blue'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'closed':
              return 'text-jungle-green'
            case 'open':
              return 'text-golden-rod'
            case 'new':
              return 'text-bleu-de-france'
            case 'pending':
              return 'text-tart-orange'
            case 'in_progress':
              return 'text-dark-blue'
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
      <div className=" text-sm font-medium text-onyx">{format(value, 'dd/MM/yyyy')}</div>
    ),
  },
  {
    Header: 'Priority',
    accessor: 'priority',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'Urgent':
              return 'bg-light-red-crimson'
            case 'Standard':
              return 'bg-light-golden-rod'
            case 'Relaxed':
              return 'bg-light-forest-green'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Urgent':
              return 'text-red-crimson'
            case 'Standard':
              return 'text-golden-rod'
            case 'Relaxed':
              return 'text-forest-green'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'File(s) Approval',
    accessor: 'isApprovalRequired',
    disableSortBy: true,
    Cell: ({ value }) => {
      return (
        <>
          {value === true && (
            <div className="flex text-center">
              <DocumentCheckIcon className="stroke-forest-green hover:stroke-halloween-orange" />
            </div>
          )}
        </>
      )
    },
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: ticket } }) => {
      const toggleEditTicketModal = useEditTicketModal((state) => state.toggleEditTicketModal)
      const toggleDeleteTicketModal = useDeleteTicketModal((state) => state.toggleDeleteTicketModal)

      return (
        <div className="invisible flex space-x-2 group-hover:visible">
          <Tooltip title="Edit Ticket" placement="top">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleEditTicketModal(ticket)
              }}
            >
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Delete Ticket" placement="top">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleDeleteTicketModal(ticket)
              }}
            >
              <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]
