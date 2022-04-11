import { format } from 'date-fns'
import { Column } from 'react-table'
import { Client } from '../../types/Client.type'

export const ClientTableColumns: Array<Column<Client>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Company Name',
    accessor: 'name',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Rating',
    accessor: 'rating',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Client Since',
    accessor: 'clientSince',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
]
