'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '@/components/composites/inputs/FormField';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/utils/api/AuthApi';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/utils/context/loadingContext';
import * as z from 'zod';

const DASHBOARD_ROUTE = '/dashboard';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export default function Login() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const { withLoading } = useLoading();
  const { replace } = useRouter();
  const { mutateAsync, data } = useMutation({ mutationFn: signIn });

  const error = data?.error;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return withLoading(async () => {
      const res = await mutateAsync(values);
      if (res.error) return;
      return replace(redirectTo ?? DASHBOARD_ROUTE);
    });
  };

  return (
    <div className='space-y-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Welcome! please sign in into your account </CardDescription>
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
            </CardContent>
            <CardFooter className='flex flex-col gap-3'>
              <Button
                className='w-full'
                type='submit'>
                Sign In
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
        Don&apos;t have an account?{' '}
        <a
          className='underline'
          href='/auth/signup'>
          Create an account
        </a>
      </p>
    </div>
  );
}
