import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import EyeIcon from '../../components/common/icons/EyeIcon'
import TrashIcon from '../../components/common/icons/TrashIcon'
import TicketAssigneeEditModal from '../../components/panel/modals/TicketAssigneeEditModal'
import { TicketAssigneeForm } from '../../types/forms/TicketAssigneeForm.type'

export const TicketAssigneeTableColumns: Array<Column<TicketAssigneeForm>> = [
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
      <div
        className={`w-fit rounded-lg bg-honeydew py-1 px-2 font-urbanist text-sm font-medium text-jungle-green`}
      >
        {value}
      </div>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'ticketAssigneeId',
    disableSortBy: true,
    Cell: ({ value }) => {
      const { data: session } = useSession()
      const queryClient = useQueryClient()

      const [isTicketAssigneeEditModalVisible, setTicketAssigneeEditModalVisible] = useState(false)

      const toggleTicketAssigneeEditModal = () =>
        setTicketAssigneeEditModalVisible(!isTicketAssigneeEditModalVisible)

      const deleteTicketAssignee = async () => {
        const { status } = await axios.delete(`/v1/ticket-assignees/${value}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        })

        if (status === 200) {
          queryClient.invalidateQueries('assignees')
        }
      }

      return (
        <div className="flex space-x-2">
          <button onClick={toggleTicketAssigneeEditModal}>
            <EyeIcon className="stroke-waterloo" />
          </button>
          <button onClick={deleteTicketAssignee}>
            <TrashIcon className="stroke-waterloo" />
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
