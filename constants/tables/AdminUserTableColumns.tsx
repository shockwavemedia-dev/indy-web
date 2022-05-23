import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useAdminUserStore } from '../../store/AdminUserStore'
import { User } from '../../types/User.type'

export const AdminUserTableColumns: Array<Column<User>> = [
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
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx first-letter:capitalize">
        {value}
      </div>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ row: { original: user } }) => {
      const { setActiveAdminUser, toggleEditAdminUserModal, toggleDeleteAdminUserModal } =
        useAdminUserStore()

      const editAdminUser = () => {
        setActiveAdminUser(user)
        toggleEditAdminUserModal()
      }

      const deleteAdminUser = () => {
        setActiveAdminUser(user)
        toggleDeleteAdminUserModal()
      }

      return (
        <div className="flex space-x-2">
          <button onClick={editAdminUser} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <button onClick={deleteAdminUser} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
        </div>
      )
    },
  },
]
