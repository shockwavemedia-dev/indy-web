import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { FormikValues, useFormikContext } from 'formik'
import { useState } from 'react'
import FormErrorMessage from './FormErrorMessage'
import CalendarIcon from './icons/CalendarIcon'

const DateInput = ({
  name,
  placeholder,
  className,
  label,
  readOnly = false,
}: {
  name: string
  placeholder: string
  className?: string
  label?: string
  readOnly?: boolean
}) => {
  const {
    values: { [name]: date },
    setFieldValue,
  } = useFormikContext<FormikValues>()

  const [selectedDate, setSelectedDate] = useState<Date | null>(date || null)
  const [isPickerVisible, setPickerVisible] = useState(false)

  const showPicker = () => setPickerVisible(true)
  const hidePicker = () => setPickerVisible(false)

  const setDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date)
      setFieldValue(name, date)
    }
  }

  return (
    <DesktopDatePicker
      inputFormat="P"
      disableOpenPicker
      onChange={setDate}
      disabled={readOnly}
      value={selectedDate}
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
          <label
            htmlFor={name}
            className="mb-2 inline-block font-urbanist text-xs font-medium text-metallic-silver empty:hidden"
          >
            {label}
          </label>
          <div className="relative flex items-center">
            <CalendarIcon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
            <input
              ref={inputRef}
              {...inputProps}
              className={`h-12.5 w-full rounded-xl bg-transparent px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver focus:ring-2 focus:ring-jungle-green read-only:focus:ring-1 read-only:focus:ring-bright-gray ${
                isPickerVisible ? 'ring-2 ring-jungle-green' : 'ring-1 ring-bright-gray'
              } ${readOnly ? 'read-only:cursor-auto' : 'read-only:cursor-pointer'}`}
              name={name}
              spellCheck={false}
              placeholder={placeholder}
              onClick={showPicker}
              readOnly
            />
          </div>
          <FormErrorMessage name={name} />
        </div>
      )}
    />
  )
}

export default DateInput
