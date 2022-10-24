import { Tooltip } from '@mui/material'
import Image from 'next/image'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { FileIcon } from '../../components/icons/FileIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useAdminScreenStore } from '../../store/AdminScreenStore'
import { Screen } from '../../types/Screen.type'

export const AdminScreensTableColumns: Array<Column<Screen>> = [
  {
    Header: 'Screen Name',
    accessor: 'name',
    Cell: ({ value }) => <div className=" text-sm font-semibold capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Logo',
    accessor: 'logo',
    disableSortBy: true,
    Cell: ({ value }) => (
      <>
        {value?.thumbnailUrl ? (
          <div className="m-2 !mt-1">
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
    Header: 'Actions',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ row: { original: screen } }) => {
      const { setActiveAdminScreen, toggleEditAdminScreenModal, toggleDeleteAdminScreenModal } =
        useAdminScreenStore()

      const editAdminScreen = () => {
        setActiveAdminScreen(screen)
        toggleEditAdminScreenModal()
      }

      const deleteAdminScreen = () => {
        setActiveAdminScreen(screen)
        toggleDeleteAdminScreenModal()
      }

      return (
        <div className="flex space-x-2">
          <Tooltip title="Edit Screen" placement="top">
            <button onClick={editAdminScreen}>
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Delete Screen" placement="top">
            <button onClick={deleteAdminScreen}>
              <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]
