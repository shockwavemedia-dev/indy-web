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
      <div className="flex h-[140px] items-start overflow-hidden rounded-[4px] border border-solid border-ebonyclay border-opacity-10 pl-[10px]">
        <div className="mt-[14px]">
          <Icon />
        </div>
        <Field
          {...{
            className:
              'ml-[8px] border-none py-[14px] outline-none resize-none w-full h-full font-normal text-[14px] font-inter pr-[10px] placeholder-stormgray',
          }}
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
