import { Field } from 'formik'
import { Icon } from '../types/Icon.type'
import { FormErrorMessage } from './FormErrorMessage'

export const TextAreaInput = ({
  name,
  Icon,
  placeholder,
  className,
  readOnly = false,
  label,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  readOnly?: boolean
  label?: string
}) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="mb-2 inline-block text-xs font-medium text-metallic-silver empty:hidden"
    >
      {label}
    </label>
    <div>
      <Icon className="pointer-events-none absolute ml-6 mt-4 stroke-lavender-gray" />
      <Field
        className="-mb-1 h-40 w-full resize-none overflow-hidden rounded-xl bg-transparent py-4 px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-halloween-orange selection:text-white read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange focus:ring-opacity-40 read-only:focus:ring-1 read-only:focus:ring-bright-gray"
        component="textarea"
        name={name}
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
    <FormErrorMessage name={name} />
  </div>
)
