import Link from 'next/link'
import { ReactNode } from 'react'

export const FancyLink = ({
  Icon,
  title,
  subtitle,
  className,
  href,
  target = '_self',
  disabled = false,
}: {
  Icon: ReactNode
  title: string
  subtitle?: string
  className?: string
  href: string
  target?: string
  disabled?: boolean
}) => (
  <Link href={disabled ? '#' : href}>
    <a
      className={`flex items-center space-x-4 rounded-xl border border-halloween-orange bg-white px-6 py-4 ${className}${
        disabled ? ' pointer-events-none opacity-50' : ''
      }`}
      target={target}
    >
      <div className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-halloween-orange">
        {Icon}
      </div>
      <div>
        <div className="text-left text-base font-semibold text-halloween-orange line-clamp-1">
          {title}
        </div>
        <div className="text-left text-xs font-normal text-halloween-orange line-clamp-1">
          {subtitle}
        </div>
      </div>
    </a>
  </Link>
)
