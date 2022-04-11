import 'next-auth'
import 'next-auth/jwt'
import 'next-auth/user'
import { AuthenticationUser } from './types/auth/AuthenticationResponseUser.type'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationUser
    isAdmin: boolean
    isClient: boolean
  }

  interface User {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationUser
    isAdmin: boolean
    isClient: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationUser
    isAdmin: boolean
    isClient: boolean
  }
}
