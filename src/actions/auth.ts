'use server';

import bcryptjs from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { registerBaseSchema } from '@/schemas';

export const login = async (
  _prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLocaleLowerCase().trim(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: 'User created successfully.',
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Unique constraint failed')
    ) {
      return {
        ok: false,
        message: 'Email already exists.',
      };
    }
    return {
      ok: false,
      message: 'Something went wrong.',
    };
  }
};

export const authenticate = async (email: string, password: string) => {
  try {
    const parsed = registerBaseSchema
      .pick({
        email: true,
        password: true,
      })
      .safeParse({ email, password });

    if (!parsed.success) {
      return {
        ok: false,
        message: parsed.error.errors[0].message,
      };
    }

    await signIn('credentials', { email, password });
    return {
      ok: true,
      message: 'Successfully authenticated',
    };
  } catch (_error) {
    return {
      ok: false,
      message: 'Invalid credentials',
    };
  }
};
