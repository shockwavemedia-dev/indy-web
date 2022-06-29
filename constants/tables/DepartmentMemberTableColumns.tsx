import axios from 'axios'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import { useToastStore } from '../../store/ToastStore'
import { DepartmentMember } from '../../types/pages/DepartmentMember.type'

export const DepartmentMemberTableColumns: Array<Column<DepartmentMember>> = [
  {
    Header: 'Admin User ID',
    accessor: 'adminUserId',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
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
          switch (value) {
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
        value={value}
      />
    ),
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Middle Name',
    accessor: 'middleName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: '',
    accessor: 'adminUserId',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ value }) => {
      const { asPath } = useRouter()
      const queryClient = useQueryClient()
      const { showToast } = useToastStore()

      const departmentId = asPath.split('/').pop()

      const deleteMember = async () => {
        try {
          const { status } = await axios.delete(
            `/v1/departments/${asPath.split('/').pop()}/members`,
            {
              data: {
                admin_users: [value],
              },
            }
          )

          if (status === 200) {
            queryClient.invalidateQueries(['department', Number(departmentId)])
            showToast({
              type: 'success',
              message: 'Department member successfully deleted!',
            })
          }
        } catch (e) {
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
        }
      }

      return (
        <button onClick={deleteMember} className="group">
          <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
        </button>
      )
    },
  },
]
