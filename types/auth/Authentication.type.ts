import { AuthenticationUser } from './AuthenticationUser.type'

export type Authentication = {
  status: number
  title: string
  message: string
  accessToken: string
  tokenType: string
  expiresIn: number
  user: AuthenticationUser
}
