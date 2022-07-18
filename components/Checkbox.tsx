import { Field } from 'formik'
import { CheckIcon } from './icons/CheckIcon'

export const Checkbox = ({
  name,
  label,
  className,
}: {
  name: string
  label: string
  className?: string
}) => (
  <div className={`relative flex items-center ${className}`}>
    <Field
      type="checkbox"
      name={name}
      id={name}
      className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-halloween-orange checked:ring-0"
    />
    <CheckIcon className="pointer-events-none absolute left-0.75 stroke-white" />
    <label htmlFor={name} className=" text-sm font-medium text-halloween-orange">
      {label}
    </label>
  </div>
)
