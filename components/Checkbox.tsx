import { Field } from 'formik'
import { CheckIcon } from './icons/CheckIcon'

export const Checkbox = ({
  name,
  label,
  className,
  value,
}: {
  name: string
  label: string
  className?: string
  value?: string
}) => (
  <div className={`relative flex items-center ${className}`}>
    <CheckIcon className="pointer-events-none absolute left-0.75 top-0.75 stroke-white" />
    <label htmlFor={name} className=" text-sm font-medium text-halloween-orange">
      <Field
        type="checkbox"
        name={name}
        value={value}
        className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-halloween-orange checked:ring-0"
      />
      {label}
    </label>
  </div>
)
