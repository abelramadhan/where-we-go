'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '@/components/composites/inputs/FormField';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '@/utils/api/AuthApi';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/utils/context/loadingContext';
import * as z from 'zod';
import { useEffect } from 'react';
import Link from 'next/link';

const DASHBOARD_ROUTE = '/dashboard';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
  password_confirm: z.string().min(8).max(16),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const { withLoading } = useLoading();
  const { mutateAsync, data } = useMutation({ mutationFn: signUp });

  const error = data?.error;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.password_confirm) {
      form.setError('password_confirm', { message: 'Password does not match' });
      return;
    }
    return withLoading(async () => {
      const res = await mutateAsync({ email: values.email, password: values.password });
      if (res.error) return;
    });
  };

  if (data && data.data.user?.confirmed_at === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success!</CardTitle>
          <CardDescription>Please check your email inbox to confirm your account creation</CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-row justify-end'>
          <Link href={'/auth/login'}>
            <Button variant={'secondary'}>Back to login</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className='space-y-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Hello There! Let&apos;s create an account shall we </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <FormField
                control={form.control}
                name='email'
                placeholder='yourname@gmail.com'
              />
              <FormField
                control={form.control}
                name='password'
                type='password'
                placeholder='password'
              />
              <FormField
                control={form.control}
                name='password_confirm'
                type='password'
                placeholder='Confirm password'
              />
            </CardContent>
            <CardFooter className='flex flex-col gap-3'>
              <Button
                className='w-full'
                type='submit'>
                Sign Up
              </Button>
              {error && (
                <div className='w-full rounded-md py-2 px-4 bg-red-500/10'>
                  <p className='text-sm text-red-500'>{error.message}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
      <p className='w-full text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <a
          className='underline'
          href='/auth/login'>
          Sign in to your account
        </a>
      </p>
    </div>
  );
}
