import 'next-auth'
import 'next-auth/jwt'
import 'next-auth/user'
import { User as CustomUser } from './interfaces/User.interface'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenTtl: number
    user: CustomUser
    isAdmin: boolean
    isClient: boolean
  }

  interface User {
    accessToken: string
    accessTokenTtl: number
    user: CustomUser
    isAdmin: boolean
    isClient: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenTtl: number
    user: CustomUser
    isAdmin: boolean
    isClient: boolean
  }
}
