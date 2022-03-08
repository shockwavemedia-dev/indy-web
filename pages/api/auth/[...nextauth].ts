import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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

        const { data } = await res.json()

        if (data.access_token) {
          return {
            accessToken: data.access_token,
            ...data.user,
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
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken

      return session
    },
  },
})

export default nextAuth
