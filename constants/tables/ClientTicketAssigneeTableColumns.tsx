import { Column } from 'react-table'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const ClientTicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
  {
    Header: 'Name',
    accessor: 'fullName',
    Cell: ({ value }) => <div className=" text-sm font-medium capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <div className=" text-sm font-medium capitalize text-onyx">{value}</div>,
  },
]
