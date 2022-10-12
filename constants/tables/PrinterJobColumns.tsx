import { Column } from 'react-table'
import { PrinterJob } from '../../types/PrinterJob.type'

export const PrinterJobColumns: Array<Column<PrinterJob>> = [
  {
    Header: 'Printer Company',
    accessor: 'printer',
    Cell: ({ value }) => (
      <div className=" text-sm font-medium text-onyx">
        {value ? value.companyName : 'No Printer Selected'}
      </div>
    ),
  },
  {
    Header: 'Customer Name',
    accessor: 'customerName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Product',
    accessor: 'product',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Option',
    accessor: 'option',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Format',
    accessor: 'format',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
]
