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
import { userSchema } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { RegisterAction } from '@/utils/actions/authentication';
import { z } from 'zod';

const registerFormSchema = userSchema.extend({
  referral: z.string().nullable().optional(),
});
export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: RegisterFormValues) => {
    RegisterAction(JSON.parse(JSON.stringify(data)));
  };

  return (
    <Form {...form}>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md space-y-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details to create an account
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
              <FormField
                control={control}
                name="referral"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel htmlFor="referral">
                      Referral (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="referral"
                        type="text"
                        placeholder="Enter your referral code"
                        {...field}
                        value={field.value ?? ''}
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
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600">
                  Sign In
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
