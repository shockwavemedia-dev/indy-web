import { AuthenticationResponseUser } from './AuthenticationResponseUser.type'

export type AuthenticationResponse = {
  tokenType: string
  expiresIn: number
  accessToken: string
  refreshToken: string
  user: AuthenticationResponseUser
}
