import { Tables } from '@/types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';
import { Badge } from '../../ui/badge';
import ActivityCardDropdown from './ActivityCardDropdown';

type ActivityCardProps = {
  activity: Tables<'activity'>;
};

export default function ActivityCard(props: ActivityCardProps) {
  const { activity } = props;

  return (
    <Card className='relative overflow-clip pl-2'>
      <div className={twMerge('absolute left-0 h-full w-2', activity.checked ? 'bg-green-500' : 'bg-primary')} />
      <CardHeader className='w-full flex flex-row justify-between items-start'>
        <div>
          <CardTitle>{activity.title}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </div>
        <ActivityCardDropdown>
          <Button
            className='!mt-0 w-8 h-8'
            variant='ghost'
            size='icon'>
            <MoreVertical className='h-6 w-6' />
          </Button>
        </ActivityCardDropdown>
      </CardHeader>
      <CardContent>
        <div className='w-full grid grid-cols-2 gap-2'>
          <div>
            <p className='text-xs text-muted-foreground'>Budget Est.</p>
            <h5 className='font-semibold text-sm'>{activity.budget ?? '-'} IDR</h5>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Planned Date</p>
            <h5 className='font-semibold text-sm'>{activity.planned_date ?? '-'}</h5>
          </div>
          {/* <div>
            <p className='text-xs text-muted-foreground'>Status</p>
            <Badge
              variant={'outline'}
              className={activity.checked ? 'border-green-500' : 'border-primary'}>
              {activity.checked ? 'Done!' : 'We go!'}
            </Badge>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
