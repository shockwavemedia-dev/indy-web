import 'next-auth'
import 'next-auth/jwt'
import 'next-auth/user'
import { AuthenticationResponseUser } from './types/auth/AuthenticationResponseUser.type'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
  }

  interface User {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
  }
}
