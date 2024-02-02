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

import { useIsClient, useMediaQuery } from '@uidotdev/usehooks';
import { ClassName } from '@/types/global';
import { twMerge } from 'tailwind-merge';

type ResponsiveDialogProps = PropsWithChildren & {
  title?: ReactNode;
  description?: ReactNode;
  containerClassName?: ClassName;
  content?: ReactNode;
  contentClassName?: ClassName;
  footer?: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ResponsiveDialog(props: ResponsiveDialogProps) {
  const isClient = useIsClient();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!isClient) return;

  if (isDesktop) {
    return (
      <Dialog
        open={props.open}
        onOpenChange={props.onOpenChange}>
        {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
        <DialogContent className={twMerge('sm:max-w-[425px]', props.containerClassName)}>
          {(props.title || props.description) && (
            <DialogHeader>
              {props.title && <DialogTitle>{props.title}</DialogTitle>}
              {props.description && <DialogDescription>{props.description}</DialogDescription>}
            </DialogHeader>
          )}
          <div className={twMerge(props.contentClassName)}>{props.content}</div>
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
      <DrawerContent className={twMerge(props.containerClassName)}>
        {(props.title || props.description) && (
          <DrawerHeader className='text-left'>
            {props.title && <DrawerTitle>{props.title}</DrawerTitle>}
            {props.description && <DrawerDescription>{props.description}</DrawerDescription>}
          </DrawerHeader>
        )}
        <div className={twMerge('p-4', props.contentClassName)}>{props.content}</div>
        {props.footer && <DrawerFooter>{props.footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
