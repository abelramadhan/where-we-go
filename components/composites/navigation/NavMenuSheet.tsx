'use client';

import { PropsWithChildren, useState } from 'react';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Sheet } from '../../ui/sheet';

import { Button } from '../../ui/button';
import Link from 'next/link';
import menus from '@/config/menus';
import MapRenderer from '../../helper/MapRenderer';
import { usePathname } from 'next/navigation';

export default function NavMenuSheet(props: PropsWithChildren) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleSheet = () => setOpen((prev) => !prev);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetTrigger
        onClick={toggleSheet}
        asChild>
        {props.children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Where We Go</SheetTitle>
        </SheetHeader>
        <MapRenderer
          className='my-4 flex flex-col gap-2'
          items={menus}
          renderer={(menu) => (
            <Button
              className='justify-start w-full'
              variant={pathname === menu.href ? 'secondary' : 'ghost'}
              onClick={toggleSheet}
              asChild>
              <Link
                href={menu.href}
                className='inline-flex items-center gap-3'>
                <menu.icon size={24} />
                <h5 className='text-lg font-semibold'>{menu.label}</h5>
              </Link>
            </Button>
          )}
        />
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
