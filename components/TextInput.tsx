import { Field } from 'formik'
import { Icon } from '../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'

const TextInput = ({
  type,
  name,
  Icon,
  placeholder,
  className,
  readOnly = false,
  label,
}: {
  type: 'text' | 'email' | 'url'
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  readOnly?: boolean
  label?: string
}) => (
  <div className={`w-full ${className}`}>
    <label
      htmlFor={name}
      className="mb-2 inline-block font-urbanist text-xs font-medium text-metallic-silver empty:hidden"
    >
      {label}
    </label>
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
      <Field
        className="h-12.5 w-full rounded-xl px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-jungle-green read-only:focus:ring-1 read-only:focus:ring-bright-gray"
        type={type}
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
        autoComplete="off"
        readOnly={readOnly}
      />
    </div>
    <FormErrorMessage name={name} />
  </div>
)

export default TextInput
