'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { z } from 'zod';
import { LoginAction } from '@/utils/actions/authentication';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const { control, handleSubmit } = form;
  const onSubmit = (data: LoginFormValues) => {
    LoginAction(JSON.parse(JSON.stringify(data)));
  };

  return (
    <Form {...form}>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md space-y-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-blue-600">
                  Register
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
