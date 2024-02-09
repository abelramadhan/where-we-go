'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SubButtons = {
  label: string;
  icon: ReactNode;
  onClick: () => {};
};

type FloatingMenuProps = {
  icon?: ReactNode;
  onClick?: () => {};
  subButtons?: SubButtons[];
};

export default function FloatingMenu(props: FloatingMenuProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    props.onClick && props.onClick();
    props.subButtons && setOpen(true);
  };

  return (
    <>
      <div className='fixed right-6 bottom-24 z-40'>
        <Button
          onClick={() => handleClick()}
          className='h-16 w-16 shadow-lg !rounded-xl '
          size={'icon'}>
          {
            <PlusIcon
              size={32}
              className={twMerge(
                'transition-all transform duration-75 ease-in-out',
                open && props.subButtons && 'rotate-45'
              )}
            />
          }
        </Button>
      </div>
      {props.subButtons && (
        <div
          className={twMerge(
            'fixed inset-0 transition-all transform duration-75 ease-in-out',
            open ? 'block bg-black/30' : 'hidden'
          )}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
