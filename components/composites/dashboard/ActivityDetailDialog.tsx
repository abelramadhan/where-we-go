'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResponsiveDialog from '@/components/ui/responsive-dialog';
import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { BookmarkCheckIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

type ActivityDetailDialogProps = PropsWithChildren & {
  activity: Tables<'activity'>;
};

export default function ActivityDetailDialog(props: ActivityDetailDialogProps) {
  const { activity } = props;

  const [open, setOpen] = useState(false);
  const { markActivityCheck } = useSupabase();

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      trigger={props.children}
      containerClassName={'bg-primary p-0 border-0 overflow-clip'}
      contentClassName={'p-0 border-0'}
      content={
        <div>
          <div className='p-4'>
            <h4 className='text-background text-2xl font-bold [text-shadow:_0_2px_2_rgb(0_0_0_/_40%)]'>
              {activity.title}
            </h4>
            <h4 className='text-muted text-sm'>{activity.description}</h4>
          </div>
          <div className='bg-background px-4 py-6 grid grid-cols-2 gap-3'>
            <div>
              <p className='text-xs text-muted-foreground'>Budget Est.</p>
              <h5 className='font-semibold text-sm'>{activity.budget ?? '-'} IDR</h5>
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>Status</p>
              <Badge
                variant={'outline'}
                className={activity.checked ? 'border-green-500' : 'border-primary'}>
                {activity.checked ? 'Done!' : 'We go!'}
              </Badge>
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>Planned Date</p>
              <h5 className='font-semibold text-sm'>{activity.planned_date ?? '-'}</h5>
            </div>
          </div>
          <div className='bg-background p-4 pt-0 grid grid-cols-2 gap-3'>
            <Button
              className='col-span-2'
              onClick={() => markActivityCheck(activity.id)}>
              <BookmarkCheckIcon className='mr-2 h-4 w-4' />
              Mark as Done
            </Button>
            <Button variant={'secondary'}>
              <Edit2Icon className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button
              variant={'secondary'}
              className='text-red-500'>
              <Trash2Icon className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </div>
      }
    />
  );
}
