import { useId } from 'react'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { TicketPriority } from '../../types/TicketPriority.type'
import { CheckboxNoFormik } from '../CheckboxNoFormik'
import { Dropdown } from '../Dropdown'
import { CaretIcon } from '../icons/CaretIcon'
import { FilterIcon } from '../icons/FilterIcon'

const priorityList: Array<TicketPriority> = ['Relaxed', 'Standard', 'Urgent']

export const useTicketPriorityFilter = create(
  combine(
    {
      priorities: [] as Array<TicketPriority>,
    },
    (set, get) => ({
      togglePriority: (priority: TicketPriority) =>
        set({
          priorities: get().priorities.includes(priority)
            ? get().priorities.filter((s) => s !== priority)
            : [...get().priorities, priority],
        }),
      getAsPayload: () =>
        get().priorities.reduce((priorities, priority, i) => {
          priorities[`priorities[${i}]`] = priority

          return priorities
        }, {} as Record<string, string>),
    })
  )
)

export const TicketPriorityFilter = () => {
  const priorityId = useId()
  const priorities = useTicketPriorityFilter((state) => state.priorities)
  const togglePriority = useTicketPriorityFilter((state) => state.togglePriority)

  const actions = priorityList.map((s) => (
    <CheckboxNoFormik
      key={`${priorityId}-${s}`}
      checked={priorities.includes(s)}
      label={s}
      onChange={() => togglePriority(s)}
      className="capitalize"
    />
  ))

  return (
    <Dropdown actions={actions}>
      {({ visible }) => (
        <div className="flex items-center space-x-2 rounded-md text-sm font-medium">
          <FilterIcon className="stroke-lavender-gray" />
          <div>Priority</div>
          <CaretIcon
            className={`transition-transform stroke-waterloo${visible ? '' : ' rotate-180'}`}
          />
        </div>
      )}
    </Dropdown>
  )
}
