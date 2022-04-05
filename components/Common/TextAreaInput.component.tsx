import { Field } from 'formik'
import { Icon } from '../../types/Icon.type'

const TextAreaInput = ({
  name,
  Icon,
  placeholder,
  className,
  errorMessage,
  touched,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  errorMessage?: string
  touched?: boolean
}) => (
  <div className={`block ${className}`}>
    <Icon className="pointer-events-none absolute ml-6 mt-4 stroke-lavender-gray" />
    <Field
      className="no-sc min-h-35 w-full resize-none overflow-hidden rounded-xl bg-transparent py-4 px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
      component="textarea"
      name={name}
      spellCheck={false}
      placeholder={placeholder}
    />
    {touched && errorMessage && (
      <div className="font-small mb-3 mt-0 w-full whitespace-pre-line font-urbanist text-xs capitalize  text-fire-brick">
        {touched && errorMessage}
      </div>
    )}
  </div>
)

export default TextAreaInput
