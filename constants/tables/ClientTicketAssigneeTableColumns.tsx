import { Column } from 'react-table'
import { EyeIcon } from '../../components/icons/EyeIcon'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const ClientTicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
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
    Header: 'Actions',
    accessor: 'ticketAssigneeId',
    disableSortBy: true,
    Cell: ({ row: { original: ticketAssignee } }) => {
      const { setActiveTicketAssignee, toggleViewTicketAssigneeModal } = useTicketAssigneeStore()

      const viewTicketAssignee = () => {
        setActiveTicketAssignee(ticketAssignee)
        toggleViewTicketAssigneeModal()
      }

      return (
        <div className="flex space-x-2">
          <button onClick={viewTicketAssignee}>
            <EyeIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
