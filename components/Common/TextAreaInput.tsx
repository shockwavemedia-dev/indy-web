import { Field } from 'formik'
import { Icon } from '../../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'

const TextAreaInput = ({
  name,
  Icon,
  placeholder,
  className,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  errorMessage?: string
  touched?: boolean
}) => (
  <div className={className}>
    <div className="flex">
      <Icon className="pointer-events-none absolute ml-6 mt-4 stroke-lavender-gray" />
      <Field
        className="min-h-35 w-full resize-none overflow-hidden rounded-xl bg-transparent py-4 px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
        component="textarea"
        name={name}
        spellCheck={false}
        placeholder={placeholder}
      />
    </div>
    <FormErrorMessage name={name} />
  </div>
)

export default TextAreaInput
