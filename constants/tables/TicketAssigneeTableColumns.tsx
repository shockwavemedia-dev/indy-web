import { useState } from 'react'
import { Column } from 'react-table'
import EyeIcon from '../../components/common/icons/EyeIcon'
import TrashIcon from '../../components/common/icons/TrashIcon'
import DeleteTicketAssigneeModal from '../../components/panel/modals/DeleteTicketAssigneeModal'
import EditTicketAssigneeModal from '../../components/panel/modals/EditTicketAssigneeModal'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const TicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
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
      const [isTicketAssigneeEditModalVisible, setTicketAssigneeEditModalVisible] = useState(false)
      const [isTicketAssigneeDeleteModalVisible, setTicketAssigneeDeleteModalVisible] =
        useState(false)

      const toggleTicketAssigneeEditModal = () =>
        setTicketAssigneeEditModalVisible(!isTicketAssigneeEditModalVisible)

      const toggleTicketAssigneeDeleteModal = () =>
        setTicketAssigneeDeleteModalVisible(!isTicketAssigneeDeleteModalVisible)

      return (
        <div className="flex space-x-2">
          <button onClick={toggleTicketAssigneeEditModal} className="group">
            <EyeIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <button onClick={toggleTicketAssigneeDeleteModal} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <EditTicketAssigneeModal
            isVisible={isTicketAssigneeEditModalVisible}
            onClose={toggleTicketAssigneeEditModal}
            ticketAssignee={ticketAssignee}
          />
          <DeleteTicketAssigneeModal
            isVisible={isTicketAssigneeDeleteModalVisible}
            onClose={toggleTicketAssigneeDeleteModal}
            ticketAssignee={ticketAssignee}
          />
        </div>
      )
    },
  },
]
