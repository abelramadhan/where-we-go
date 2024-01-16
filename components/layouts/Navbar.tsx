import { useServerClient } from '@/utils/supabase/server';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import { Input } from 'postcss';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from '../ui/sheet';
import NavMenuSheet from './NavMenuSheet';

export default function Navbar() {
  const supabase = useServerClient();

  return (
    <nav className='sticky w-full inline-flex justify-center items-center border-b border-input '>
      <div className='w-full max-w-4xl inline-flex justify-between items-center p-4 '>
        <h3 className='text-xl font-bold'>Where We Go</h3>
        <NavMenuSheet>
          <Button
            variant='outline'
            size='icon'>
            <MenuIcon className='h-4 w-4' />
          </Button>
        </NavMenuSheet>
      </div>
    </nav>
  );
}
