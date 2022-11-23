import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import { usePhotographyVideographyStore } from '../../store/PhotographyVideographyStore'
import { PhotographyVideography } from '../../types/PhotographyVideography.type'

export const PhotographyVideographyColumns: Array<Column<PhotographyVideography>> = [
  {
    Header: 'Service',
    accessor: 'serviceType',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'Photography':
              return 'bg-light-navy'
            case 'Photography & Videography':
              return 'bg-honeydew'
            case 'Videography':
              return 'bg-light-golden-rod'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Photography':
              return 'text-navy'
            case 'Photography & Videography':
              return 'text-jungle-green'
            case 'Videography':
              return 'text-golden-rod'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: 'Shoot Title',
    accessor: 'shootTitle',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Shoot Date',
    accessor: 'shootDate',
    Cell: ({ value }) => (
      <div className=" text-sm font-medium text-onyx">{format(value, 'dd/MM/yyyy')}</div>
    ),
  },
  {
    Header: 'Event Name',
    accessor: 'eventName',
    Cell: ({ value }) => <div className=" text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Booking Type',
    accessor: 'bookingType',
    Cell: ({ value }) => (
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'Half Day Booking':
              return 'bg-light-red-crimson'
            case 'Full Day Booking':
              return 'bg-light-golden-rod'
            case 'Multiple Day Booking':
              return 'bg-light-navy'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Half Day Booking':
              return 'text-red-crimson'
            case 'Full Day Booking':
              return 'text-golden-rod'
            case 'Multiple Day Booking':
              return 'text-navy'
          }
        })()}
        value={value}
      />
    ),
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: booking } }) => {
      const { setActivePhotographyVideography, toggleDeletePhotographyVideographyModal } =
        usePhotographyVideographyStore()

      const deleteBooking = () => {
        setActivePhotographyVideography(booking)
        toggleDeletePhotographyVideographyModal()
      }

      return (
        <div className="flex space-x-2">
          <Link href={`/photography-videography/${booking.id}`}>
            <Tooltip title="Edit Booking" placement="top" className="cursor-pointer">
              <a className="group">
                <EditIcon className="stroke-waterloo transition-all group-hover:stroke-halloween-orange" />
              </a>
            </Tooltip>
          </Link>
          <Tooltip title="Delete Booking" placement="top">
            <button onClick={deleteBooking} className="group">
              <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]
