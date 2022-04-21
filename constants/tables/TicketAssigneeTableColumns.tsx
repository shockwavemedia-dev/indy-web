import axios from 'axios'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import EyeIcon from '../../components/common/icons/EyeIcon'
import TrashIcon from '../../components/common/icons/TrashIcon'
import TicketAssigneeEditModal from '../../components/panel/modals/TicketAssigneeEditModal'
import { TicketAssignee } from '../../types/TicketAssignee.type'

export const TicketAssigneeTableColumns: Array<Column<TicketAssignee>> = [
  {
    Header: 'Department',
    accessor: 'departmentName',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
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
    Cell: ({ value }) => {
      const queryClient = useQueryClient()

      const [isTicketAssigneeEditModalVisible, setTicketAssigneeEditModalVisible] = useState(false)

      const toggleTicketAssigneeEditModal = () =>
        setTicketAssigneeEditModalVisible(!isTicketAssigneeEditModalVisible)

      const deleteTicketAssignee = async () => {
        const { status } = await axios.delete(`/v1/ticket-assignees/${value}`)

        if (status === 200) {
          queryClient.invalidateQueries('assignees')
        }
      }

      return (
        <div className="flex space-x-2">
          <button onClick={toggleTicketAssigneeEditModal} className="group">
            <EyeIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <button onClick={deleteTicketAssignee} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
          </button>
          <TicketAssigneeEditModal
            isVisible={isTicketAssigneeEditModalVisible}
            onClose={toggleTicketAssigneeEditModal}
            ticketAssigneeId={value}
          />
        </div>
      )
    },
  },
]
