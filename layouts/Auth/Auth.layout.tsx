import { ReactElement } from 'react'
import { AuthLayoutWrapper } from '../../components/Auth'

export const AuthLayout = ({ children }: { children: ReactElement }) => {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
}
