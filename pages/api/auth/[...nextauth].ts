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

        if (data.accessToken) {
          return {
            user: data.user,
            accessToken: data.accessToken,
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
