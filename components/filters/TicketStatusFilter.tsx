import { useId } from 'react'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { TicketStatus } from '../../types/TicketStatus.type'
import { CheckboxNoFormik } from '../CheckboxNoFormik'
import { Dropdown } from '../Dropdown'
import { CaretIcon } from '../icons/CaretIcon'
import { FilterIcon } from '../icons/FilterIcon'

const statusList: Array<TicketStatus> = [
  'closed',
  'new',
  'pending',
  'on hold',
  'open',
  'resolved',
  'deleted',
]

export const useTicketStatusFilter = create(
  combine(
    {
      statuses: [] as Array<TicketStatus | 'show_overdue'>,
    },
    (set, get) => ({
      toggleStatus: (status: TicketStatus | 'show_overdue') =>
        set({
          statuses: get().statuses.includes(status)
            ? get().statuses.filter((s) => s !== status)
            : [...get().statuses, status],
        }),
      getAsPayload: () =>
        get()
          .statuses.filter((t) => t !== 'show_overdue')
          .reduce((statuses, status, i) => {
            statuses[`statuses[${i}]`] = status

            return statuses
          }, {} as Record<string, string>),
    })
  )
)

export const TicketStatusFilter = () => {
  const statusId = useId()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const toggleStatus = useTicketStatusFilter((state) => state.toggleStatus)

  const actions = [
    ...statusList.map((s) => (
      <CheckboxNoFormik
        key={`${statusId}-${s}`}
        checked={statuses.includes(s)}
        label={s}
        onChange={() => toggleStatus(s)}
        className="capitalize"
      />
    )),
    <CheckboxNoFormik
      key={`${statusId}-show_overdue`}
      checked={statuses.includes('show_overdue')}
      label={'Overdue'}
      onChange={() => toggleStatus('show_overdue')}
    />,
  ]

  return (
    <Dropdown actions={actions}>
      {({ visible }) => (
        <div className="flex items-center space-x-2 rounded-md text-sm font-medium">
          <FilterIcon className="stroke-lavender-gray" />
          <div>Status</div>
          <CaretIcon
            className={`transition-transform stroke-waterloo${visible ? '' : ' rotate-180'}`}
          />
        </div>
      )}
    </Dropdown>
  )
}
