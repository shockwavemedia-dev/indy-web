import axios from 'axios'
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
            data: { accessToken, user },
          } = await axios.post<AuthenticationResponse>('/authenticate', {
            email: credentials?.email,
            password: credentials?.password,
          })

          return {
            user: user,
            accessToken: accessToken,
            isAdmin: user.userType.type === 'admin_users',
            isClient: user.userType.type === 'client_users',
          }
        } catch (e) {
          if (axios.isAxiosError(e)) {
            return Promise.reject(
              new Error(e.response?.data.message || 'Something went wrong during login!')
            )
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
        token.user = user.user
        token.isAdmin = user.isAdmin
        token.isClient = user.isClient
      }

      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken
      session.user = token.user
      session.isAdmin = token.isAdmin
      session.isClient = token.isClient

      return session
    },
  },
})

export default nextAuth
