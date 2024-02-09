import BottomNavMenu from '@/components/composites/navigation/BottomNavMenu';
import Navbar from '@/components/layouts/Navbar';
import { PropsWithChildren } from 'react';

export default function DashboardLayout(props: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className='flex-1 h-full w-full inline-flex justify-center overflow-y-auto'>
        <div className='w-full max-w-4xl p-4'>{props.children}</div>
      </div>
      <BottomNavMenu />
    </>
  );
}
