import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email: email.toLocaleLowerCase() },
          });

          if (!user) return null;
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password,
          );

          if (passwordsMatch)
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              emailVerified: user.emailVerified,
              role: user.role,
              image: user.image,
            };
        }

        return null;
      },
    }),
  ],
});
