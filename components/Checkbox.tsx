import { Field, FormikValues, useFormikContext } from 'formik'
import { ChangeEvent } from 'react'
import { CheckIcon } from './icons/CheckIcon'

export const Checkbox = ({
  name,
  label,
  className,
  value,
  onChange,
}: {
  name?: string
  label: string
  className?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>()

  return (
    <div className={`relative flex items-center ${className}`}>
      <Field
        type="checkbox"
        name={name}
        id={`${name}-${value}`}
        value={value}
        className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-halloween-orange checked:ring-0"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (name) {
            if (Array.isArray(values[name])) {
              if (values[name].includes(value)) {
                setFieldValue(
                  name,
                  values[name].filter((v: string) => v !== value)
                )
              } else {
                setFieldValue(name, [...values[name], value])
              }
            } else {
              setFieldValue(name, !values[name])
            }

            if (onChange) {
              onChange(event)
            }
          }
        }}
      />
      <CheckIcon className="pointer-events-none absolute left-0.75 top-1/2 -translate-y-1/2  stroke-white" />
      <label
        htmlFor={`${name}-${value}`}
        className="block h-fit select-none pt-0.5 text-sm font-medium text-halloween-orange"
      >
        {label}
      </label>
    </div>
  )
}
