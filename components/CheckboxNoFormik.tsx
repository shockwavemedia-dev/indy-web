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
  onChange?: () => void
}) => {
  const id = useId()

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        className={`mr-3 h-4 w-4 appearance-none rounded ring-1 ring-inset ring-bright-gray ${
          checked ? 'bg-halloween-orange ring-0' : 'bg-white'
        }`}
        onChange={onChange}
      />
      <CheckIcon className="pointer-events-none absolute left-0.75 top-1/2 -translate-y-1/2  stroke-white" />
      <label
        htmlFor={id}
        className="block h-fit select-none pt-0.5 text-sm font-medium text-halloween-orange empty:hidden"
      >
        {label}
      </label>
    </div>
  )
}
