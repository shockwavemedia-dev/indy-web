import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'
import { LinkWrapper } from './Link.wrapper'

export const Link = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <NextLink href={href} passHref>
      <LinkWrapper>{children}</LinkWrapper>
    </NextLink>
  )
}
