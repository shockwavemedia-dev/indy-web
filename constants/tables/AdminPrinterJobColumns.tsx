import { Column } from 'react-table'
import { Pill } from '../../components/Pill'
import { PrinterJob } from '../../types/PrinterJob.type'

export const AdminPrinterJobColumns: Array<Column<PrinterJob>> = [
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
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'Completed':
              return 'bg-honeydew'
            case 'Cancelled':
              return 'bg-light-tart-orange'
            case 'Awaiting Quote':
              return 'bg-light-navy'
            case 'Awaiting Approval':
              return 'bg-light-golden-rod'
            case 'In Progress':
              return 'bg-alice-blue'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Completed':
              return 'text-jungle-green'
            case 'Cancelled':
              return 'text-tart-orange'
            case 'Awaiting Quote':
              return 'text-navy'
            case 'Awaiting Approval':
              return 'text-golden-rod'
            case 'In Progress':
              return 'text-bleu-de-france'
          }
        })()}
        value={value}
      />
    ),
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
  {
    Header: 'Stocks',
    accessor: 'stocks',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
]
