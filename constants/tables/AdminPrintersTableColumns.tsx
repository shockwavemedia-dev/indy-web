import Image from 'next/image'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useAdminPrinterStore } from '../../store/AdminPrinterStore'
import { Printer } from '../../types/Printer.type'

export const AdminPrintersTableColumns: Array<Column<Printer>> = [
  {
    Header: 'Company',
    accessor: 'companyName',
    Cell: ({ value }) => <div className=" text-sm font-semibold capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Logo',
    accessor: 'companyThumbnailLogoUrl',
    disableSortBy: true,
    Cell: ({ value }) => (
      <>
        {value && (
          <div className="m-2 rounded-md">
            <Image src={value} alt={value} height={100} width={100} />
          </div>
        )}
      </>
    ),
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Contact Name',
    accessor: 'contactName',
    Cell: ({ value }) => <div className=" text-sm font-semibold capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Cell: ({ value }) => <div className=" text-sm font-semibold capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ row: { original: printer } }) => {
      const { setActiveAdminPrinter, toggleEditAdminPrinterModal, toggleDeleteAdminPrinterModal } =
        useAdminPrinterStore()

      const editAdminPrinter = () => {
        setActiveAdminPrinter(printer)
        toggleEditAdminPrinterModal()
      }

      const deleteAdminPrinter = () => {
        setActiveAdminPrinter(printer)
        toggleDeleteAdminPrinterModal()
      }

      return (
        <div className="invisible flex space-x-2 group-hover:visible">
          <button onClick={editAdminPrinter}>
            <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
          <button onClick={deleteAdminPrinter}>
            <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
