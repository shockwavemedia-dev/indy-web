import { MouseEventHandler, ReactNode } from 'react'

const Button = ({
  type = 'button',
  ariaLabel,
  disabled = false,
  children,
  light = false,
  onClick,
  className,
}: {
  type?: 'button' | 'submit'
  ariaLabel: string
  disabled?: boolean
  children: ReactNode
  light?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`flex min-h-12.5 w-full flex-1 items-center justify-center space-x-2 rounded-xl font-urbanist text-base font-semibold ${className} ${
      light
        ? 'border-1.5 border-solid border-bright-gray bg-white text-onyx'
        : 'bg-jungle-green text-white'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
