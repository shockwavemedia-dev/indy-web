import axios, { AxiosError } from 'axios'
import { addDays, getTime } from 'date-fns'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthenticationResponse } from '../../../types/auth/AuthenticationResponse.type'

const nextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const {
            data: { accessToken, user, refreshToken, expiresIn },
          } = await axios.post<AuthenticationResponse>('/authenticate', {
            email: credentials?.email,
            password: credentials?.password,
          })

          const {
            userType: { role, type },
          } = user

          return {
            user,
            accessToken,
            refreshToken,
            expiry: getTime(addDays(new Date(), expiresIn / 86400)),
            isAdmin: type === 'admin_users' && role === 'admin',
            isClient: type === 'client_users',
            isManager: type === 'admin_users' && (role === 'account manager' || role === 'manager'),
            isStaff: type === 'admin_users' && role === 'staff',
          }
        } catch (e) {
          if (((x): x is AxiosError<{ message: string }> => axios.isAxiosError(x))(e)) {
            return Promise.reject(new Error(e.response?.data.message))
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiry = user.expiry
        token.user = user.user
        token.isAdmin = user.isAdmin
        token.isClient = user.isClient
        token.isManager = user.isManager
        token.isStaff = user.isStaff
      }

      if (getTime(new Date()) >= token.expiry) {
        const {
          data: { accessToken, refreshToken, expiresIn },
        } = await axios.post<AuthenticationResponse>('/refresh-token', {
          refresh_token: token.refreshToken,
        })

        token.accessToken = accessToken
        token.refreshToken = refreshToken
        token.expiry = getTime(addDays(new Date(), expiresIn / 86400))
      }

      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expiry = token.expiry
      session.user = token.user
      session.isAdmin = token.isAdmin
      session.isClient = token.isClient
      session.isManager = token.isManager
      session.isStaff = token.isStaff

      return session
    },
  },
})

export default nextAuth
