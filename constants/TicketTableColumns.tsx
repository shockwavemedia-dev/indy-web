import { format } from 'date-fns'
import { Column } from 'react-table'
import { Ticket } from '../interfaces/Ticket.interface'

export const TicketTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'Department',
    accessor: 'departmentName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Subject',
    accessor: 'subject',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
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
]
