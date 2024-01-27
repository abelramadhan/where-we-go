'use client';

import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useEffect, useState } from 'react';
import MapRenderer from '../../helper/MapRenderer';
import { Badge } from '../../ui/badge';
import ActivityCard from './ActivityCard';
import { PlusIcon } from 'lucide-react';
import GroupFormDialog from '../dialogs/GroupFormDialog';
import { useQuery } from 'react-query';
import { group } from 'console';
import { useLoading } from '@/utils/context/loadingContext';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

type ActivityListProps = {};

export default function ActivityList(props: ActivityListProps) {
  const { getGroupActivity, getUserGroups } = useSupabase();
  const { setLoading } = useLoading();

  const [selectedGroup, setSelectedGroup] = useState<Tables<'user_group'>>();

  const groupsQuery = useQuery('groups', getUserGroups);
  const activitiesQuery = useQuery(['activities', selectedGroup?.id], () => getGroupActivity(selectedGroup?.id), {
    refetchOnMount: false,
  });

  const groups = groupsQuery.data?.data ?? [];
  const activities = activitiesQuery.data?.data ?? [];

  useEffect(() => {
    if (selectedGroup || !groupsQuery.data?.data) return;
    setSelectedGroup(groupsQuery.data.data[0]);
  }, [groupsQuery.data]);

  useEffect(() => {
    if (!selectedGroup) return;
    activitiesQuery.refetch();
  }, [selectedGroup]);

  const onCreateGroupSuccess = () => {
    groupsQuery.refetch();
    toast.success('Success! Your group has been created');
  };

  return (
    <div className='space-y-4'>
      <MapRenderer
        className='inline-flex items-center gap-2 w-full overflow-x-auto'
        items={groups}
        renderer={(item) => (
          <Badge
            className='h-8 whitespace-nowrap'
            key={item.id}
            variant={item.id === selectedGroup?.id ? 'default' : 'outline'}
            onClick={() => setSelectedGroup(item)}>
            {item.name}
          </Badge>
        )}
        extraElementAfter={
          <GroupFormDialog onSuccessSubmit={onCreateGroupSuccess}>
            <Badge
              onClick={() => {}}
              className='h-8 w-10 flex items-center justify-center'
              variant={'outline'}>
              <PlusIcon size={14} />
            </Badge>
          </GroupFormDialog>
        }
      />
      <MapRenderer
        className='space-y-2'
        items={activities}
        renderer={(item) => (
          <ActivityCard
            activity={item}
            key={item.id}
          />
        )}
      />
    </div>
  );
}
