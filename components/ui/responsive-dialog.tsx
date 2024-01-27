'use client';

import { PropsWithChildren, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { useMediaQuery } from '@uidotdev/usehooks';

type ResponsiveDialogProps = PropsWithChildren & {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ResponsiveDialog(props: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog
        open={props.open}
        onOpenChange={props.onOpenChange}>
        {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
        <DialogContent className='sm:max-w-[425px]'>
          {(props.title || props.description) && (
            <DialogHeader>
              {props.title && <DialogTitle>{props.title}</DialogTitle>}
              {props.description && <DialogDescription>{props.description}</DialogDescription>}
            </DialogHeader>
          )}
          {props.content}
          {props.footer && <DialogFooter>{props.footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={props.open}
      onOpenChange={props.onOpenChange}>
      {props.trigger && <DrawerTrigger asChild>{props.trigger}</DrawerTrigger>}
      <DrawerContent>
        {(props.title || props.description) && (
          <DrawerHeader className='text-left'>
            {props.title && <DrawerTitle>{props.title}</DrawerTitle>}
            {props.description && <DrawerDescription>{props.description}</DrawerDescription>}
          </DrawerHeader>
        )}
        <div className='p-4'>{props.content}</div>
        {props.footer && <DrawerFooter>{props.footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
