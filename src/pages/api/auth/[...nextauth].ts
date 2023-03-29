import { dbUsers } from '@/database'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    accessToken: string
  }

  interface User {
    _id: string
    id?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'mail@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await dbUsers.checkUser(credentials!.email, credentials!.password)

        return user
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    strategy: 'jwt',
    updateAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any
      session.user = token.user as any

      return session
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.checkOAuthUser(user!.email || '', user!.name || '')
            break
          case 'credentials':
            token.user = user
            break
        }
      }

      return token
    },
  },
}

export default NextAuth(authOptions)
