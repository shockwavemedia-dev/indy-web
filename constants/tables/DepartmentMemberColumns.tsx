import { Column } from 'react-table'
import { Pill } from '../../components/Pill'
import { DepartmentMember } from '../../types/pages/DepartmentMember.type'

export const DepartmentMemberColumns: Array<Column<DepartmentMember>> = [
  {
    Header: 'Admin User ID',
    accessor: 'adminUserId',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'account manager':
              return 'bg-light-orchid'
            case 'admin':
              return 'bg-light-golden-rod'
            case 'manager':
              return 'bg-light-navy'
            case 'staff':
              return 'bg-light-forest-green'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'account manager':
              return 'text-orchid'
            case 'admin':
              return 'text-golden-rod'
            case 'manager':
              return 'text-navy'
            case 'staff':
              return 'text-forest-green'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Middle Name',
    accessor: 'middleName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
]
