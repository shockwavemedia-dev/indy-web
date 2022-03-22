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
  Icon: ComponentType<{ className: string }>
  placeholder: string
  disableAutoComplete?: boolean
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!isShowPassword)

  return (
    <div className="flex w-full flex-col">
      <label className="mb-2 font-inter text-xs font-normal text-mineshaft" htmlFor={name}>
        {label}
      </label>
      <div className="h-11.5 flex items-center overflow-hidden rounded border border-solid border-ebonyclay border-opacity-10">
        <label className="flex h-full items-center pl-2.5 pr-2" htmlFor={name}>
          <Icon className="stroke-black" />
        </label>
        <Field
          className="h-full w-full pr-2.5 font-inter text-sm font-normal placeholder-stormgray"
          type={isShowPassword ? 'text' : type}
          name={name}
          id={name}
          spellCheck={false}
          placeholder={placeholder}
          autoComplete={disableAutoComplete ? (type === 'text' ? 'off' : 'new-password') : 'on'}
        />
        {type === 'password' && (
          <button
            className="mr-2.5 flex cursor-pointer justify-center bg-transparent p-0"
            aria-label="Show Password"
            onClick={toggleShowPassword}
            tabIndex={-1}
            type="button"
          >
            <EyeOpenIcon className="stroke-black" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TextInput
