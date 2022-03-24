import { Field } from 'formik'
import { ComponentType, useState } from 'react'
import EyeOpenIcon from './Icons/EyeOpen.icon'

const TextInput = ({
  type = 'text',
  name,
  Icon,
  placeholder,
  disableAutoComplete = false,
  className,
}: {
  type?: 'text' | 'email' | 'password'
  name: string
  Icon: ComponentType<{ className: string }>
  placeholder: string
  disableAutoComplete?: boolean
  className?: string
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!isShowPassword)

  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <label className="absolute ml-6" htmlFor={name}>
        <Icon className="stroke-lavender-gray" />
      </label>
      <Field
        className="min-h-12.5 w-full rounded-xl px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray ring-offset-0 focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
        type={isShowPassword ? 'text' : type}
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
        autoComplete={disableAutoComplete ? (type === 'text' ? 'off' : 'new-password') : 'on'}
      />
      {type === 'password' && (
        <button
          className="absolute right-0 mr-6"
          aria-label="Show Password"
          onClick={toggleShowPassword}
          tabIndex={-1}
          type="button"
        >
          <EyeOpenIcon className="stroke-lavender-gray" />
        </button>
      )}
    </div>
  )
}

export default TextInput
