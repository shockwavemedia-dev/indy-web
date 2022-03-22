import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <NextLink href={href} passHref>
    <div className="cursor-pointer font-inter text-sm font-medium">{children}</div>
  </NextLink>
)

export default Link
