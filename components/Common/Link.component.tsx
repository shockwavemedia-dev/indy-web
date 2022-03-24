import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <NextLink href={href} passHref>
    <div className="cursor-pointer font-urbanist text-sm font-semibold text-jungle-green">
      {children}
    </div>
  </NextLink>
)

export default Link
