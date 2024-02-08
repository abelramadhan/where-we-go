'use client';

import MapRenderer from '@/components/helper/MapRenderer';
import { Button } from '@/components/ui/button';
import menus from '@/config/menus';
import { NavMenu } from '@/types/global';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function BottomNavMenu() {
  const pathname = usePathname();
  return (
    <nav className='fixed bottom-0 w-full bg-background border-t p-2'>
      <MapRenderer
        className='grid grid-cols-4'
        items={menus}
        renderer={(item, index) => (
          <BottomNavButton
            active={item.href === pathname}
            menu={item}
            key={index}
          />
        )}
      />
    </nav>
  );
}

type BottomNavButton = {
  menu: NavMenu;
  active: boolean;
};

const BottomNavButton = ({ menu, active }: BottomNavButton) => {
  return (
    <Link
      href={menu.href}
      className='w-full h-full flex justify-center items-center'>
      <div
        className={twMerge(
          'flex flex-col justify-center items-center h-fit w-auto aspect-square gap-1',
          active ? 'text-foreground' : 'text-muted-foreground'
        )}>
        <menu.icon size={18} />
        <span className='leading-none text-sm'>{menu.label}</span>
      </div>
    </Link>
  );
};
