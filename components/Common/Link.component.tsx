import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

const Link = ({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) => (
  <NextLink href={href}>
    <a className={`cursor-pointer font-urbanist underline-offset-1 hover:underline ${className}`}>
      {children}
    </a>
  </NextLink>
)

export default Link
