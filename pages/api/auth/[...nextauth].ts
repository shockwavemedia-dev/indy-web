import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Authentication } from '../../../interfaces/Authentication.interface'

const nextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const {
          data: { accessToken, user, expiresIn },
        } = await axios.post<Authentication>('/authenticate', {
          email: credentials?.email,
          password: credentials?.password,
        })

        if (accessToken) {
          return {
            user: user,
            accessToken: accessToken,
            accessTokenTtl: expiresIn,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.accessTokenTtl = user.accessTokenTtl
        token.user = user.user
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    },
  },
})

export default nextAuth
