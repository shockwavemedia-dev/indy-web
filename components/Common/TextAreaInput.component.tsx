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
}) => {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft" htmlFor={name}>
        {label}
      </label>
      <div className="flex h-[140px] items-start overflow-hidden rounded-[4px] border border-solid border-ebonyclay border-opacity-10">
        <label htmlFor={name} className="h-full pt-[14px] pl-[10px] pr-[8px]">
          <Icon />
        </label>
        <Field
          className="h-full w-full resize-none border-none py-[14px] pr-[10px] font-inter text-[14px] font-normal placeholder-stormgray outline-none"
          component="textarea"
          name={name}
          id={name}
          spellCheck={false}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default TextAreaInput
