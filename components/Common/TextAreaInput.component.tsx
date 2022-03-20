import { Field } from 'formik'
import { ComponentType } from 'react'

const TextAreaInput = ({
  name,
  label,
  Icon,
  placeholder,
}: {
  name: string
  label: string
  Icon: ComponentType
  placeholder: string
}) => (
  <div className="flex w-full flex-col">
    <label className="mb-2 font-inter text-xs font-normal text-mineshaft" htmlFor={name}>
      {label}
    </label>
    <div className="flex h-35 items-start overflow-hidden rounded border border-solid border-ebonyclay border-opacity-10">
      <label htmlFor={name} className="h-full pt-3.5 pl-2.5 pr-2">
        <Icon />
      </label>
      <Field
        className="h-full w-full resize-none border-none py-3.5 pr-2.5 font-inter text-sm font-normal placeholder-stormgray outline-none"
        component="textarea"
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
      />
    </div>
  </div>
)

export default TextAreaInput
