import { Switch, Tooltip } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import { FileIcon } from '../../components/icons/FileIcon'
import { useToastStore } from '../../store/ToastStore'
import { Screen } from '../../types/Screen.type'

export const AdminClientScreensTableColumns: Array<Column<Screen>> = [
  {
    Header: 'Screen Name',
    accessor: 'name',
    Cell: ({ value }) => (
      <div className=" pointer-events-none text-sm font-semibold capitalize text-onyx opacity-40">
        {value}
      </div>
    ),
  },
  {
    Header: 'Logo',
    accessor: 'logo',
    disableSortBy: true,
    Cell: ({ value }) => (
      <>
        {value?.thumbnailUrl ? (
          <div className="pointer-events-none m-2 !mt-1 opacity-40">
            <Image
              src={value.thumbnailUrl}
              alt={value.fileName}
              height={50}
              width={50}
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="h-9 min-w-[2.25rem]">
            <FileIcon className="h-8 min-w-[2rem]" />
          </div>
        )}
      </>
    ),
  },
  {
    Header: 'Status',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ row: { original: screen } }) => {
      const queryClient = useQueryClient()
      const { showToast } = useToastStore()

      const [sceenStatus, setScreenStatus] = useState(true)

      const updateStatus = async () => {
        try {
          const { status } = await axios.put(`/v1/screens/${screen.id}`, { status: sceenStatus })

          if (status === 200) {
            queryClient.invalidateQueries('screens')
            showToast({
              type: 'success',
              message: 'Screen successfully deleted!',
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
        <div className="flex space-x-2">
          <Tooltip title="Update Status" placement="top">
            <Switch
              name="status"
              checked={sceenStatus}
              onClick={() => {
                updateStatus()
                setScreenStatus(false)
              }}
            />
          </Tooltip>
        </div>
      )
    },
  },
]
