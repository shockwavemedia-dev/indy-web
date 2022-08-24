import { Switch } from '@mui/material'
import { Field } from 'formik'

export const SwitchButton = ({
  name,
  label,
  className,
  value,
}: {
  name?: string
  label: string
  className?: string
  value?: string
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <label
        htmlFor={`${name}-${value}`}
        className="right block h-fit select-none text-base font-medium text-onyx"
      >
        <Field component={Switch} name={name} value={value} />
        {label}
      </label>
    </div>
  )
}
