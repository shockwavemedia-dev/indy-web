import { Field } from 'formik'
import { Icon } from '../../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'

const TextInput = ({
  type,
  name,
  Icon,
  placeholder,
  className,
}: {
  type: 'text' | 'email'
  name: string
  Icon: Icon
  placeholder: string
  className?: string
}) => (
  <div className={`w-full ${className}`}>
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
      <Field
        className="min-h-12.5 w-full rounded-xl px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
        type={type}
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
    <FormErrorMessage name={name} />
  </div>
)

export default TextInput
