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
    Header: 'Customer Name',
    accessor: 'customerName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
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
            case 'Todo':
              return 'bg-alice-blue'
            case 'Pending':
              return 'bg-light-tart-orange'
            case 'Cancelled':
              return 'bg-light-deep-saffron'
            case 'Awaiting Quote':
              return 'bg-light-navy'
            case 'Awaiting Approval':
              return 'bg-light-golden-rod'
            case 'In Progress':
              return 'bg-light-orchid'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Completed':
              return 'text-jungle-green'
            case 'Todo':
              return 'text-bleu-de-france'
            case 'Pending':
              return 'text-tart-orange'
            case 'Cancelled':
              return 'text-deep-saffron'
            case 'Awaiting Quote':
              return 'text-navy'
            case 'Awaiting Approval':
              return 'text-golden-rod'
            case 'In Progress':
              return 'text-dark-orchid'
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
]
