import { AuthenticationUser } from './AuthenticationUser.interface'

export interface Authentication {
  status: number
  title: string
  message: string
  accessToken: string
  tokenType: string
  expiresIn: number
  user: AuthenticationUser
}
