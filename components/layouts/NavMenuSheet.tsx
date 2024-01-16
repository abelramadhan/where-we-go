import { PropsWithChildren } from 'react';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, Sheet } from '../ui/sheet';

import { Button } from '../ui/button';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import menus from '@/config/menus';
import MapRenderer from '../helper/MapRenderer';

export default function NavMenuSheet(props: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Where We Go</SheetTitle>
        </SheetHeader>
        <div className='my-4 flex flex-col gap-1'>
          <MapRenderer
            items={menus}
            renderer={(menu) => (
              <Button
                className='justify-start'
                variant='ghost'
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
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
