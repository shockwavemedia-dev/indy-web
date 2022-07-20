import { ReactNode } from 'react'

export const Button = ({
  onClick,
  type,
  ariaLabel,
  children,
  disabled = false,
  light = false,
  className,
}: {
  type: 'button' | 'submit'
  onClick?: () => void
  ariaLabel: string
  children: ReactNode
  disabled?: boolean
  light?: boolean
  className?: string
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`flex h-12.5 w-full items-center justify-center space-x-2 rounded-xl text-base font-semibold ${
      light
        ? 'border-1.5 border-solid border-bright-gray bg-white text-onyx'
        : 'bg-halloween-orange text-white'
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)
