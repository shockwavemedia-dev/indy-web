import Link from 'next/link'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { EyeIcon } from '../../components/icons/EyeIcon'
import { useEditDepartmentModal } from '../../components/modals/EditDepartmentModal'
import { Pill } from '../../components/Pill'
import { Department } from '../../types/Department.type'

export const DepartmentTableColumns: Array<Column<Department>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Department Name',
    accessor: 'name',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'active':
              return 'bg-honeydew'
            case 'inactive':
              return 'bg-alice-blue'
            case 'deleted':
              return 'bg-light-tart-orange'
            case 'inactive':
              return 'bg-light-deep-saffron'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'active':
              return 'text-jungle-green'
            case 'inactive':
              return 'text-bleu-de-france'
            case 'deleted':
              return 'text-tart-orange'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'Minimum Delivery Days',
    accessor: 'minDeliveryDays',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: department } }) => {
      const { toggleModal } = useEditDepartmentModal()

      const editDepartment = () => toggleModal(department)

      return (
        <div className="flex space-x-2">
          <button onClick={editDepartment} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
          <Link href={`/departments/${department.id}`}>
            <a className="group">
              <EyeIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </a>
          </Link>
        </div>
      )
    },
  },
]
