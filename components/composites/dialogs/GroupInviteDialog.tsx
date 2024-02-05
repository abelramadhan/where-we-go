import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tables } from '@/types/database.types';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import GroupInviteLink from '../dashboard/GroupInviteLink';

type GroupInviteDialogProps = PropsWithChildren & {
  group: Tables<'user_group'>;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
};

export default function GroupInviteDialog(props: GroupInviteDialogProps) {
  const { group, open, setOpen } = props;

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      {props.children && <DialogTrigger asChild>{props.children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {open && <GroupInviteLink group={group} />}
      </DialogContent>
    </Dialog>
  );
}
