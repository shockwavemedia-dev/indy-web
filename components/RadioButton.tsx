import { Field } from 'formik'

export const RadioButton = ({
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
        className="block h-fit select-none pt-0.5 text-sm font-medium text-halloween-orange"
      >
        <Field
          type="radio"
          name={name}
          value={value}
          className="mr-3 h-4 w-4 rounded bg-white  checked:bg-halloween-orange checked:ring-0"
        />
        {label}
      </label>
    </div>
  )
}
