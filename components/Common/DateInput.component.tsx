import { DesktopDatePicker } from '@mui/lab'
import { useEffect, useState } from 'react'
import FormErrorMessage from './FormErrorMessage.component'
import CalendarIcon from './icons/CalendarIcon'

const DateInput = ({
  name,
  placeholder,
  setFieldValue,
  className,
}: {
  name: string
  placeholder: string
  className?: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isPickerVisible, setPickerVisible] = useState(false)

  const showPicker = () => setPickerVisible(true)
  const hidePicker = () => setPickerVisible(false)

  useEffect(() => setFieldValue(name, selectedDate), [selectedDate])

  const setDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  return (
    <DesktopDatePicker
      inputFormat="P"
      disableOpenPicker
      onChange={setDate}
      value={selectedDate}
      onClose={hidePicker}
      open={isPickerVisible}
      showDaysOutsideCurrentMonth
      PaperProps={{
        className: 'shadow-react-select mt-2',
      }}
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
          <div className="relative flex items-center">
            <CalendarIcon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
            <input
              ref={inputRef}
              {...inputProps}
              className={`min-h-12.5 w-full rounded-xl bg-transparent px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40 ${
                isPickerVisible
                  ? 'ring-2 ring-jungle-green ring-opacity-40'
                  : 'ring-1 ring-bright-gray'
              }`}
              name={name}
              spellCheck={false}
              placeholder={placeholder}
              readOnly
              onClick={showPicker}
            />
          </div>
          <FormErrorMessage name={name} />
        </div>
      )}
    />
  )
}

export default DateInput
