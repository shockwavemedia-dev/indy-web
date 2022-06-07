import { Column } from 'react-table'
import { Pill } from '../../components/Pill'
import { Department } from '../../types/Department.type'

export const DepartmentTableColumns: Array<Column<Department>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Department Name',
    accessor: 'name',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
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
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
]
