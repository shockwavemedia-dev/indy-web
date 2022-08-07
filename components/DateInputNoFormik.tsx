import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useState } from 'react'
import { CalendarIcon } from './icons/CalendarIcon'

export const DateInputNoFormik = ({
  placeholder,
  className,
  label,
  readOnly = false,
  views,
  format,
  value,
  onChange,
  twHeight = 'h-12.5',
}: {
  placeholder?: string
  className?: string
  label?: string
  readOnly?: boolean
  views?: Array<'year' | 'month' | 'day'>
  format?: string
  value?: Date
  onChange: (date: Date) => void
  twHeight?: string
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false)

  const showPicker = () => setPickerVisible(true)
  const hidePicker = () => setPickerVisible(false)

  return (
    <DesktopDatePicker
      views={views}
      inputFormat={format || 'P'}
      disableOpenPicker
      onChange={(date: Date | null) => {
        if (date) onChange(date)
      }}
      disabled={readOnly}
      value={value || null}
      onClose={hidePicker}
      open={isPickerVisible}
      showDaysOutsideCurrentMonth
      componentsProps={{
        switchViewButton: {
          disableRipple: true,
        },
        leftArrowButton: {
          disableRipple: true,
        },
        rightArrowButton: {
          disableRipple: true,
        },
      }}
      renderInput={({ inputRef, inputProps }) => (
        <div className={`w-full ${className}`}>
          <label className="mb-2 inline-block text-xs font-medium text-metallic-silver empty:hidden">
            {label}
          </label>
          <div className="relative flex items-center">
            <CalendarIcon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
            <input
              ref={inputRef}
              {...inputProps}
              className={`${twHeight} w-full rounded-xl bg-transparent px-13  text-sm font-medium text-onyx placeholder-metallic-silver focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray ${
                isPickerVisible ? 'ring-2 ring-halloween-orange' : 'ring-1 ring-bright-gray'
              } ${readOnly ? 'read-only:cursor-auto' : 'read-only:cursor-pointer'}`}
              spellCheck={false}
              placeholder={placeholder}
              onClick={showPicker}
              readOnly
            />
          </div>
        </div>
      )}
    />
  )
}
