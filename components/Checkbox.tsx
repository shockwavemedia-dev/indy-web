import { Field } from 'formik'
import CheckIcon from './icons/CheckIcon'

const Checkbox = ({
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
      className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-jungle-green checked:ring-0"
    />
    <CheckIcon className="pointer-events-none absolute left-0.752 stroke-white" />
    <label htmlFor={name} className="font-urbanist text-sm font-medium text-onyx">
      {label}
    </label>
  </div>
)

export default Checkbox
