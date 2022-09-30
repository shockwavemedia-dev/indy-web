import { Tooltip } from '@mui/material'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import { CrownIcon } from '../../components/icons/CrownIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useDeleteClientUserModal } from '../../components/modals/DeleteClientUserModal'
import { useEditClientUserModal } from '../../components/modals/EditClientUserModal'
import { useToastStore } from '../../store/ToastStore'
import { ClientUser } from '../../types/ClientUser.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'

export const AdminClientUsersTableColumns: Array<Column<ClientUser>> = [
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
      const queryClient = useQueryClient()
      const showToast = useToastStore((state) => state.showToast)

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
          {original.userType.id !== original.userType.client.ownerId && (
            <Tooltip title="Make Owner" placement="top">
              <button
                onClick={async (e) => {
                  e.stopPropagation()

                  try {
                    const { status } = await axios.put(
                      `/v1/clients/${original.userType.client.id}/owner`,
                      {
                        clientUserId: original.userType.id,
                      }
                    )

                    if (status === 200) {
                      queryClient.invalidateQueries(['client-users', original.userType.client.id])
                    }
                  } catch (e) {
                    showToast({
                      type: 'error',
                      message: get422And400ResponseError(e),
                    })
                  }
                }}
              >
                <CrownIcon className="stroke-waterloo hover:stroke-halloween-orange" />
              </button>
            </Tooltip>
          )}
        </div>
      )
    },
  },
]
