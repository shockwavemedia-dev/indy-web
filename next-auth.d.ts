import 'next-auth'
import 'next-auth/jwt'
import 'next-auth/user'
import { AuthenticationResponseUser } from './types/auth/AuthenticationResponseUser.type'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationResponseUser
  }

  interface User {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenTtl: number
    user: AuthenticationUser
  }
}
