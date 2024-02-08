import DeployButton from '../components/DeployButton';
import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps';
import SignUpUserSteps from '@/components/SignUpUserSteps';
import Header from '@/components/Header';
import { cookies } from 'next/headers';
import Logo from '@/components/composites/other/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Index() {
  return (
    <div className='relative flex-1 h-screen w-full flex flex-col items-center justify-center gap-1'>
      <div className='flex flex-col items-start'>
        <Logo size='lg' />
        <p className='text-muted-foreground'>Plan activities with your friends!</p>
        <div className='inline-flex gap-3 mt-4'>
          <Link href={'/dashboard'}>
            <Button size={'sm'}>Get Started!</Button>
          </Link>
          <Link href={'/auth/signup'}>
            <Button
              size={'sm'}
              variant={'secondary'}>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className='absolute w-fill bottom-0 p-4 text-center'>
        <p className='text-muted-foreground/60 text-sm'>This simple app is made by Abel Ramadhan</p>
      </div>
    </div>
  );
}
