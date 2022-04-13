import { Field } from 'formik'
import { Icon } from '../../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'

const TextAreaInput = ({
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
    <label htmlFor={name} className="mb-2 font-urbanist text-xs font-medium text-metallic-silver">
      {label}
    </label>
    <div>
      <Icon className="pointer-events-none absolute ml-6 mt-4 stroke-lavender-gray" />
      <Field
        className="-mb-1 min-h-35 w-full resize-none overflow-hidden rounded-xl bg-transparent py-4 px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white read-only:cursor-auto focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40 read-only:focus:ring-1 read-only:focus:ring-bright-gray"
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

export default TextAreaInput
