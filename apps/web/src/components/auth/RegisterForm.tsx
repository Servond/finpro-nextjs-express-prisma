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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { User, userSchema } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { hash } from 'bcryptjs';

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (values: User) => {
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

  return (
    <Form {...form}>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              If you already have an account, please{' '}
              <a href="/auth/login" className="text-blue-500 underline">
                sign in here
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="full_name"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="fullname">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="fullname"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="phone_number"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="participant"
                          className="hover:cursor-pointer"
                        >
                          Participant
                        </SelectItem>
                        <SelectItem
                          value="organizer"
                          className="hover:cursor-pointer"
                        >
                          Organizer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
