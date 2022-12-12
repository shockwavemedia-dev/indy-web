import 'next-auth'
import 'next-auth/jwt'
import 'next-auth/user'
import { AuthenticationResponseUser } from './types/auth/AuthenticationResponseUser.type'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    expiry: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
    isStaff: boolean
    isPrinter: boolean
  }

  interface User {
    accessToken: string
    refreshToken: string
    expiry: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
    isStaff: boolean
    isPrinter: boolean
    isSocialMediaManager: boolean
    isSocialMediaStaff: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    expiry: number
    user: AuthenticationResponseUser
    isAdmin: boolean
    isClient: boolean
    isManager: boolean
    isStaff: boolean
    isPrinter: boolean
    isSocialMediaManager: boolean
    isSocialMediaStaff: boolean
  }
}
