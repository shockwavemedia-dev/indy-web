import { useId } from 'react'
import { CheckIcon } from './icons/CheckIcon'

export const CheckboxNoFormik = ({
  label,
  className = '',
  checked,
  onChange,
}: {
  label: string
  className?: string
  checked: boolean
  onChange: () => void
}) => {
  const id = useId()

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        className={`mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray ${
          checked ? 'bg-halloween-orange ring-0' : ''
        }`}
        onChange={onChange}
      />
      <CheckIcon className="pointer-events-none absolute left-0.75 stroke-white" />
      <label
        htmlFor={id}
        className="block h-fit select-none pt-0.5 text-sm font-medium text-halloween-orange"
      >
        {label}
      </label>
    </div>
  )
}
