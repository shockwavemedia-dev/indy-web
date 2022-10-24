import { Tooltip } from '@mui/material'
import { Column } from 'react-table'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useDeleteDeletePrinterJobModalModalStore } from '../../components/modals/DeletePrinterJobModal'
import { Pill } from '../../components/Pill'
import { PrinterJob } from '../../types/PrinterJob.type'

export const ClientPrinterJobColumns: Array<Column<PrinterJob>> = [
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
    Header: 'Action',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: printer } }) => {
      const { toggleModal: togglePrinterModal } = useDeleteDeletePrinterJobModalModalStore()

      return (
        <div className="flex">
          <Tooltip title="Delete Printer" placement="top">
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePrinterModal(printer)
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
