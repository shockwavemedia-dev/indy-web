import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

const Link = ({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className: string
}) => (
  <NextLink href={href} passHref>
    <span
      className={`cursor-pointer font-urbanist underline-offset-1 hover:underline ${className}`}
    >
      {children}
    </span>
  </NextLink>
)

export default Link
