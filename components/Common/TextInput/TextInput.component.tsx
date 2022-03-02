import { ChangeEventHandler, ComponentType, forwardRef, useState } from 'react'
import { EyeIcon } from '../Icon'
import { TextInputWrapper } from './TextInput.wrapper'

export enum TextInputType {
  Default = 'text',
  Password = 'password',
  Email = 'email',
}

export const TextInput = forwardRef<
  HTMLInputElement,
  {
    type?: TextInputType
    label: string
    Icon: ComponentType
    placeholder: string
    onChange?: ChangeEventHandler<HTMLInputElement>
  }
>(({ type = TextInputType.Default, label, Icon, placeholder, onChange }, ref) => {
  const [isShowPassword, setShowPassword] = useState(false)

  return (
    <TextInputWrapper>
      <label className="label" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <div className="input">
        <Icon />
        <input
          id={label.toLowerCase()}
          spellCheck={false}
          placeholder={placeholder}
          ref={ref}
          type={isShowPassword ? TextInputType.Default : type}
          onChange={onChange}
        />
        {type === TextInputType.Password && (
          <button className="toggle-show-password" onClick={() => setShowPassword(!isShowPassword)}>
            <EyeIcon />
          </button>
        )}
      </div>
    </TextInputWrapper>
  )
})
TextInput.displayName = 'TextInput'
