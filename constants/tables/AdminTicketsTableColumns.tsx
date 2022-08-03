import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import { Column } from 'react-table'
import { EyeIcon } from '../../components/icons/EyeIcon'
import { Pill } from '../../components/Pill'
import { Ticket } from '../../types/Ticket.type'

export const AdminTicketsTableColumns: Array<Column<Ticket>> = [
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
      return (
        <div className="flex space-x-2">
          <Link href={`/ticket/${ticket.id}`}>
            <Tooltip title="View Ticket" placement="top" className="cursor-pointer">
              <a className="group">
                <EyeIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </a>
            </Tooltip>
          </Link>
        </div>
      )
    },
  },
]
