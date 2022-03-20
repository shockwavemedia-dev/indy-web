import { MouseEventHandler, ReactNode } from 'react'

const Button = ({
  type = 'button',
  ariaLabel,
  disabled = false,
  children,
  isLight = false,
  onClick,
}: {
  type?: 'button' | 'submit'
  ariaLabel: string
  disabled?: boolean
  children: ReactNode
  isLight?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`flex h-11 flex-1 cursor-pointer items-center justify-center space-x-2 rounded font-inter text-sm font-medium ${
      isLight ? 'border border-solid border-tuna text-shark' : 'bg-shark text-white'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
