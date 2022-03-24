import { Field } from 'formik'
import { ComponentType } from 'react'

const TextAreaInput = ({
  name,
  Icon,
  placeholder,
  className,
}: {
  name: string
  Icon: ComponentType<{ className: string }>
  placeholder: string
  className?: string
}) => (
  <div className={`relative flex w-full items-center ${className}`}>
    <Icon className="absolute ml-6 stroke-lavender-gray" />
    <Field
      className="z-10 h-full w-full resize-none rounded-xl bg-transparent py-4 px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
      component="textarea"
      name={name}
      id={name}
      spellCheck={false}
      placeholder={placeholder}
    />
  </div>
)

export default TextAreaInput
