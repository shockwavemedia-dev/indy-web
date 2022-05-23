import { Column } from 'react-table'
import { User } from '../../types/User.type'

export const AdminUserTableColumns: Array<Column<User>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Name',
    accessor: 'firstName',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Role',
    accessor: 'userType',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx first-letter:capitalize">
        {value.role}
      </div>
    ),
  },
]
