'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const LoginAction = async (email: string, password: string) => {
  const credentialsData = {
    email: email,
    password: password,
    redirectTo: '/',
  };

  try {
    await signIn('credentials', credentialsData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
