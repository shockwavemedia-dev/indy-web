import { MouseEventHandler, ReactNode } from 'react'

const Button = ({
  onClick,
  ariaLabel,
  children,
  disabled = false,
  light = false,
  submit = false,
  className,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>
  ariaLabel: string
  children: ReactNode
  disabled?: boolean
  light?: boolean
  submit?: boolean
  className?: string
}) => (
  <button
    type={submit ? 'submit' : 'button'}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`flex min-h-12.5 w-full flex-1 items-center justify-center space-x-2 rounded-xl font-urbanist text-base font-semibold ${
      light
        ? 'border-1.5 border-solid border-bright-gray bg-white text-onyx'
        : 'bg-jungle-green text-white'
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
