import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import { useAdminUserStore } from '../../store/AdminUserStore'
import { User } from '../../types/User.type'

export const AdminUserTableColumns: Array<Column<User>> = [
  {
    Header: 'Name',
    accessor: 'fullName',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Role',
    accessor: 'userType',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value.role) {
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
          switch (value.role) {
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
        value={value.role}
      />
    ),
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ value }) => <div className="text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Open Tickets',
    accessor: 'openTickets',
    Cell: ({ value }) => <div className="text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Closed Tickets(Last 30 Days)',
    accessor: 'closedTickets30',
    Cell: ({ value }) => <div className="text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Closed Tickets(Last 90 Days)',
    accessor: 'closedTickets90',
    Cell: ({ value }) => <div className="text-sm font-semibold text-onyx">{value}</div>,
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
            case 'guest':
              return 'bg-alice-blue'
            case 'revoked':
            case 'deleted':
              return 'bg-light-tart-orange'
            case 'inactive':
            case 'not verified':
              return 'bg-light-deep-saffron'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'active':
              return 'text-jungle-green'
            case 'guest':
              return 'text-bleu-de-france'
            case 'revoked':
            case 'deleted':
              return 'text-tart-orange'
            case 'inactive':
            case 'not verified':
              return 'text-deep-saffron'
          }
        })()}
        value={value}
      />
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
            <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
          <button onClick={deleteAdminUser} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
