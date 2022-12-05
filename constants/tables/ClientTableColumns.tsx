import { format } from 'date-fns'
import Image from 'next/image'
import { Column } from 'react-table'
import { Client } from '../../types/Client.type'

export const ClientTableColumns: Array<Column<Client>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Company Name',
    accessor: 'name',
    Cell: ({
      value,
      row: {
        original: { logoThumbnailUrl },
      },
    }) => (
      <div className="flex items-center space-x-5 text-sm font-semibold text-onyx">
        {logoThumbnailUrl && (
          <div className="relative h-7 w-7">
            <Image src={logoThumbnailUrl} layout="fill" alt="" className="rounded-lg" />
          </div>
        )}
        <div>{value}</div>
      </div>
    ),
  },
  {
    Header: 'Rating',
    accessor: 'rating',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Client Since',
    accessor: 'clientSince',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className=" text-sm font-medium text-onyx">{format(value, 'dd/MM/yyyy')}</div>
    ),
  },
]
