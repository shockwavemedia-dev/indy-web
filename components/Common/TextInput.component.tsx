import { Field } from 'formik'
import { useState } from 'react'
import { Icon } from '../../types/Icon.type'
import EyeOpenIcon from './Icons/EyeOpen.icon'

const TextInput = ({
  type = 'text',
  name,
  Icon,
  placeholder,
  disableAutoComplete = false,
  errorMessage,
  touched,
  className,
}: {
  type?: 'text' | 'email' | 'password'
  name: string
  Icon: Icon
  placeholder: string
  disableAutoComplete?: boolean
  errorMessage?: string
  touched?: boolean
  className?: string
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!isShowPassword)

  return (
    <>
      <div className={`relative flex w-full items-center ${className}`}>
        <Icon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
        <Field
          className={
            touched && errorMessage
              ? 'min-h-12.5 w-full rounded-xl bg-transparent px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-fire-brick selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40'
              : 'min-h-12.5 w-full rounded-xl bg-transparent px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40'
          }
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
      {touched && errorMessage && (
        <div className="text-rose-900 mb-3 mt-0 w-full whitespace-pre-line font-urbanist text-xxs font-semibold capitalize  text-fire-brick">
          {touched && errorMessage}
        </div>
      )}
    </>
  )
}

export default TextInput
