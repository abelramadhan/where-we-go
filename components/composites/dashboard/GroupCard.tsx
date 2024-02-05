import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/types/database.types';
import { UsersIcon } from 'lucide-react';
import GroupInviteDialog from '../dialogs/GroupInviteDialog';
import { useState } from 'react';

type GroupCardProps = {
  group: Tables<'user_group'>;
};

export default function GroupCard(props: GroupCardProps) {
  const { group } = props;

  const [open, setOpen] = useState(false);

  return (
    <GroupInviteDialog
      open={open}
      setOpen={setOpen}
      group={group}
      title={group.name}
      description='Use the link below to invite your friend to this group!'>
      <Card
        className='relative overflow-clip'
        onClick={() => setOpen(true)}>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <div className='absolute left-0 bottom-0 w-2 h-full bg-primary' />
      </Card>
    </GroupInviteDialog>
  );
}
