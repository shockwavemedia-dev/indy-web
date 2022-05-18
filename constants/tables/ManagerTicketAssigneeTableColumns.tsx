import { Column } from 'react-table'
import EditIcon from '../../components/icons/EditIcon'
import TrashIcon from '../../components/icons/TrashIcon'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const ManagerTicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
  {
    Header: 'Name',
    accessor: 'fullName',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'ticketAssigneeId',
    disableSortBy: true,
    Cell: ({ row: { original: ticketAssignee } }) => {
      const {
        setActiveTicketAssignee,
        toggleEditTicketAssigneeModal,
        toggleDeleteTicketAssigneeModal,
      } = useTicketAssigneeStore()

      const editTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleEditTicketAssigneeModal()
      }

      const deleteTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleDeleteTicketAssigneeModal()
      }

      return (
        <div className="flex space-x-2">
          <button onClick={editTicketAssignee} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <button onClick={deleteTicketAssignee} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
        </div>
      )
    },
  },
]
