import camelcaseKeys from 'camelcase-keys'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Authentication } from '../../../interfaces/Authentication.interface'
import { API_BASE_URL } from '../../../utils/constants'

const nextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_BASE_URL}/authenticate`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        let { data } = await res.json()

        const authentication: Authentication = camelcaseKeys(data, { deep: true })

        if (authentication.accessToken) {
          return {
            user: authentication.user,
            accessToken: authentication.accessToken,
            accessTokenTtl: authentication.expiresIn,
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
