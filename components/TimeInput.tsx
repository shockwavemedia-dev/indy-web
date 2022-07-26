import { DesktopTimePicker } from '@mui/x-date-pickers'
import { FormikValues, useFormikContext } from 'formik'
import { useState } from 'react'
import { FormErrorMessage } from './FormErrorMessage'
import { ClockIcon } from './icons/ClockIcon'

export const TimeInput = ({
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
    values: { [name]: time },
    setFieldValue,
  } = useFormikContext<FormikValues>()

  const [selectedTime, setSelectedTime] = useState<string | null>(time || null)
  const [isPickerVisible, setPickerVisible] = useState(false)

  const showPicker = () => setPickerVisible(true)
  const hidePicker = () => setPickerVisible(false)

  const setTime = (date: string | null) => {
    if (date) {
      setSelectedTime(date)
      setFieldValue(name, date)
    }
  }

  return (
    <DesktopTimePicker
      disableOpenPicker
      onChange={setTime}
      disabled={readOnly}
      value={selectedTime}
      onClose={hidePicker}
      open={isPickerVisible}
      renderInput={({ inputRef, inputProps }) => (
        <div className={`w-full ${className}`}>
          <label
            htmlFor={name}
            className="mb-2 inline-block text-xs font-medium text-metallic-silver empty:hidden"
          >
            {label}
          </label>
          <div className="relative flex items-center">
            <ClockIcon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
            <input
              ref={inputRef}
              {...inputProps}
              className={`h-12.5 w-full rounded-xl bg-transparent px-13  text-sm font-medium text-onyx placeholder-metallic-silver focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray ${
                isPickerVisible ? 'ring-2 ring-halloween-orange' : 'ring-1 ring-bright-gray'
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
