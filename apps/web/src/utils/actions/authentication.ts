import { LoginFormValues } from '@/components/auth/LoginForm';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { User } from '@/types/user.types';
import { useRouter } from 'next/navigation';
import { hash } from 'bcryptjs';

const Login = async (data: LoginFormValues) => {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error('Invalid credentials');
    }
  }
};

const Register = async (values: User) => {
  const router = useRouter();
  const hashedPassword = await hash(values.password, 10);
  const user = { ...values, password: hashedPassword };
  await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  router.push('/dashboard');
};

export { Login, Register };
