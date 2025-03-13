import type { NextAuthConfig } from "next-auth";

export const publicRoutes = ["/auth/login", "/auth/register"];
export const protectedRoutes = ["/profile", "/checkout", "/orders"];
export const adminRoutes = ["/admin"];

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (isAdminRoute) {
        const isAdmin = auth?.user?.role === "admin";
        if (!isAdmin) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (isProtectedRoute) {
        if (!isLoggedIn) {
          return false;
        }
        return true;
      }

      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route),
      );

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
