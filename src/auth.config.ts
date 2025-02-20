import type { NextAuthConfig } from "next-auth";

export const protectedRoutes = ["/profile", "/checkout", "/orders"];
export const publicRoutes = ["/auth/login", "/auth/register"];

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );
      const isPublicRoute = publicRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }
      if (isLoggedIn && isPublicRoute) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.data as typeof session.user;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
