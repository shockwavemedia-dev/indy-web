import { Field } from 'formik'
import { useState } from 'react'
import { Icon } from '../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'
import EyeIcon from './icons/EyeIcon'
import EyeSlashIcon from './icons/EyeSlashIcon'

const PasswordInput = ({
  name,
  Icon,
  placeholder,
  className,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!isShowPassword)

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center">
        <Icon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
        <Field
          className="h-12.5 w-full rounded-xl px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray focus:ring-2 focus:ring-jungle-green"
          type={isShowPassword ? 'text' : 'password'}
          name={name}
          id={name}
          spellCheck={false}
          placeholder={placeholder}
          autoComplete={isShowPassword ? 'off' : 'new-password'}
        />
        <button
          className="group absolute right-6"
          aria-label="Show Password"
          onClick={toggleShowPassword}
          tabIndex={-1}
          type="button"
        >
          {isShowPassword ? (
            <EyeSlashIcon className="stroke-lavender-gray group-hover:stroke-jungle-green" />
          ) : (
            <EyeIcon className="stroke-lavender-gray group-hover:stroke-jungle-green" />
          )}
        </button>
      </div>
      <FormErrorMessage name={name} />
    </div>
  )
}

export default PasswordInput
