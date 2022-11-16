import { Tooltip } from '@mui/material'
import { Column } from 'react-table'
import { CrownIcon } from '../../components/icons/CrownIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useDeleteClientUserModal } from '../../components/modals/DeleteClientUserModal'
import { useEditClientUserModal } from '../../components/modals/EditClientUserModal'
import { ClientUser } from '../../types/ClientUser.type'

export const ClientUsersTableColumns: Array<Column<ClientUser>> = [
  {
    Header: '',
    accessor: 'id',
    id: 'owner',
    disableSortBy: true,
    sortType: ({ original: { userType } }) => (userType.id === userType.client.ownerId ? -1 : 1),
    Cell: ({ row: { original } }) =>
      original.userType.id === original.userType.client.ownerId ? (
        <Tooltip title="Owner" placement="top">
          <div>
            <CrownIcon className="stroke-halloween-orange" />
          </div>
        </Tooltip>
      ) : (
        <></>
      ),
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Phone',
    accessor: 'contactNumber',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <div className=" text-sm font-medium capitalize text-onyx">{value}</div>,
  },
  {
    Header: '',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      const toggleEditClientUserModal = useEditClientUserModal(
        (state) => state.toggleEditClientUserModal
      )

      const toggleDeleteClientUserModal = useDeleteClientUserModal(
        (state) => state.toggleDeleteClientUserModal
      )

      return (
        <div className="invisible flex space-x-2 group-hover:visible">
          <Tooltip title="Edit Client User" placement="top">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleEditClientUserModal(original)
              }}
            >
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Delete Client User" placement="top">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleDeleteClientUserModal(original)
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
