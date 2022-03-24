import { MouseEventHandler, ReactNode } from 'react'

const Button = ({
  type = 'button',
  ariaLabel,
  disabled = false,
  children,
  isLight = false,
  onClick,
  className,
}: {
  type?: 'button' | 'submit'
  ariaLabel: string
  disabled?: boolean
  children: ReactNode
  isLight?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`flex min-h-12.5 w-full items-center justify-center space-x-2 rounded-xl bg-jungle-green font-urbanist text-base font-semibold text-white ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
