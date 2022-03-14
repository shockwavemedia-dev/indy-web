import { Field } from 'formik'
import { ComponentType, useState } from 'react'
import EyeOpenIcon from './Icons/EyeOpen.icon'

const TextInput = ({
  type = 'text',
  name,
  label,
  Icon,
  placeholder,
  disableAutoComplete = false,
}: {
  type?: 'text' | 'email' | 'password'
  name: string
  label: string
  Icon: ComponentType
  placeholder: string
  disableAutoComplete?: boolean
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!isShowPassword)
  }

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft" htmlFor={name}>
        {label}
      </label>
      <div className="flex h-[46px] items-center overflow-hidden rounded-[4px] border border-solid border-ebonyclay border-opacity-10 pl-[10px]">
        <Icon />
        <Field
          {...{
            className:
              'ml-[8px] w-full h-full font-normal text-[14px] font-inter pr-[10px] placeholder-stormgray',
          }}
          type={isShowPassword ? 'text' : type}
          name={name}
          id={name}
          spellCheck={false}
          placeholder={placeholder}
          autoComplete={disableAutoComplete ? (type === 'text' ? 'off' : 'new-password') : 'on'}
        />
        {type === 'password' && (
          <button
            className="mr-[10px] flex cursor-pointer justify-center bg-transparent p-0"
            aria-label="Show Password"
            onClick={toggleShowPassword}
            tabIndex={-1}
            type="button"
          >
            <EyeOpenIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default TextInput
