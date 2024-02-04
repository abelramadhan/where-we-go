import Logo from '@/components/composites/other/Logo';
import { PropsWithChildren } from 'react';

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <div className='min-h-[100dvh] flex flex-col items-center justify-center gap-8'>
      <Logo />
      {props.children}
    </div>
  );
}
