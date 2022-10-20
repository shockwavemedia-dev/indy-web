import { useId } from 'react'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { TicketType } from '../../types/TicketType.type'
import { CheckboxNoFormik } from '../CheckboxNoFormik'
import { Dropdown } from '../Dropdown'
import { CaretIcon } from '../icons/CaretIcon'
import { FilterIcon } from '../icons/FilterIcon'

const typeList: Array<TicketType> = ['email', 'event', 'graphic', 'print', 'task', 'library']

export const useTicketTypeFilter = create(
  combine(
    {
      types: [] as Array<TicketType | 'show_overdue'>,
    },
    (set, get) => ({
      toggleType: (type: TicketType) =>
        set({
          types: get().types.includes(type)
            ? get().types.filter((s) => s !== type)
            : [...get().types, type],
        }),
      getAsPayload: () =>
        get()
          .types.filter((t) => t !== 'show_overdue')
          .reduce((types, type, i) => {
            types[`types[${i}]`] = type

            return types
          }, {} as Record<string, string>),
    })
  )
)

export const TicketTypeFilter = () => {
  const typeId = useId()
  const types = useTicketTypeFilter((state) => state.types)
  const toggleType = useTicketTypeFilter((state) => state.toggleType)

  const actions = typeList.map((s) => (
    <CheckboxNoFormik
      key={`${typeId}-${s}`}
      checked={types.includes(s)}
      label={s}
      onChange={() => toggleType(s)}
      className="capitalize"
    />
  ))

  return (
    <Dropdown actions={actions}>
      {({ visible }) => (
        <div className="flex items-center space-x-2 rounded-md text-sm font-medium">
          <FilterIcon className="stroke-lavender-gray" />
          <div>Type</div>
          <CaretIcon
            className={`transition-transform stroke-waterloo${visible ? '' : ' rotate-180'}`}
          />
        </div>
      )}
    </Dropdown>
  )
}
