import axios, { AxiosError } from 'axios'
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
        token.user = user.user
      }

      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    },
  },
})

export default nextAuth
