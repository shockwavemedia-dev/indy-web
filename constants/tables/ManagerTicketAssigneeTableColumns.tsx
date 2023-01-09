import { Tooltip } from '@mui/material'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { UserIcon } from '../../components/icons/UserIcon'
import { UserIconOff } from '../../components/icons/UserOffIcon'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const ManagerTicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
  {
    Header: 'Name',
    accessor: 'fullName',
    Cell: ({ value }) => <div className=" text-sm font-medium capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <div className=" text-sm font-medium capitalize text-onyx">{value}</div>,
  },
  {
    Header: '',
    accessor: 'ticketAssigneeId',
    disableSortBy: true,
    Cell: ({ row: { original: ticketAssignee } }) => {
      const {
        setActiveTicketAssignee,
        toggleEditTicketAssigneeModal,
        toggleDeleteTicketAssigneeModal,
        toggleReAssignTicketAssigneeModal,
      } = useTicketAssigneeStore()

      const editTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleEditTicketAssigneeModal()
      }

      const deleteTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleDeleteTicketAssigneeModal()
      }

      const reAssignTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleReAssignTicketAssigneeModal()
      }

      return (
        <div className="flex space-x-2">
          <button onClick={editTicketAssignee} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
          <button
            onClick={reAssignTicketAssignee}
            className="group"
            disabled={ticketAssignee.status === 'completed'}
          >
            {ticketAssignee.status === 'completed' && (
              <Tooltip
                title="Cannot reassign if already completed"
                placement="top-end"
                className="ml-auto"
              >
                <div>
                  <UserIconOff className="stroke-waterloo group-hover:stroke-halloween-orange" />
                </div>
              </Tooltip>
            )}
            {ticketAssignee.status !== 'completed' && (
              <div>
                <UserIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </div>
            )}
          </button>
          <button onClick={deleteTicketAssignee} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
