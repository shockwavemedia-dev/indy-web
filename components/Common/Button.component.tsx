import { ReactNode } from 'react'

const Button = ({
  type = 'button',
  ariaLabel,
  disabled = false,
  children,
  isLight = false,
}: {
  type?: 'button' | 'submit'
  ariaLabel: string
  disabled?: boolean
  children: ReactNode
  isLight?: boolean
}) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`flex h-[44px] flex-1 cursor-pointer select-none items-center justify-center space-x-[8px] rounded-[4px] font-inter text-[14px] font-medium 
      ${isLight ? 'text-raisinblack' : 'bg-raisinblack text-white'}
      `}
    >
      {children}
    </button>
  )
}

export default Button
