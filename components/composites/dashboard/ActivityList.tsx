'use client';

import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useEffect, useMemo, useState } from 'react';
import MapRenderer from '../../helper/MapRenderer';
import { Badge } from '../../ui/badge';
import ActivityCard from './ActivityCard';
import { PlusIcon } from 'lucide-react';
import GroupFormDialog from '../dialogs/GroupFormDialog';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/utils/context/loadingContext';
import { toast } from 'sonner';
import FloatingMenu from './FloatingMenu';
import ActivityFormDialog from '../dialogs/ActivityFormDialog';
import dateSorter from '@/utils/helper/dateSorter';
import ActivityDetailDialog from './ActivityDetailDialog';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import GroupInviteDialog from '../dialogs/GroupInviteDialog';

type ActivityListProps = {};

export default function ActivityList(props: ActivityListProps) {
  const { getGroupActivity, getUserGroups } = useSupabase();
  const { setLoading } = useLoading();

  const [selectedGroup, setSelectedGroup] = useState<Tables<'user_group'>>();
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const groupsQuery = useQuery({ queryKey: ['groups'], queryFn: getUserGroups });
  const activitiesQuery = useQuery({
    queryKey: ['activities', selectedGroup?.id],
    queryFn: () => getGroupActivity(selectedGroup?.id),
  });

  const groups = groupsQuery.data?.data ?? [];

  const upcomingActivities = useMemo(() => {
    const activities = activitiesQuery.data?.data ?? [];
    const filteredActivities = activities.filter((activity) => !activity.checked);
    const sortedActivities = filteredActivities.sort(dateSorter);
    return sortedActivities;
  }, [activitiesQuery]);

  useEffect(() => {
    if (selectedGroup !== undefined || !groupsQuery.data?.data) return;
    setSelectedGroup(groupsQuery.data.data[0]);
  }, [groupsQuery.data, selectedGroup]);

  useEffect(() => {
    if (!selectedGroup) return;
    activitiesQuery.refetch();
  }, [selectedGroup, activitiesQuery]);

  const onCreateGroupSuccess = (res: PostgrestSingleResponse<Tables<'user_group'>[]>) => {
    groupsQuery.refetch();
    // toast.success('Success! Your group has been created');
    if (res.data) {
      setSelectedGroup(res.data[0]);
      setOpenInviteDialog(true);
    }
  };

  const onCreateActivitySuccess = () => {
    activitiesQuery.refetch();
    toast.success(`Success! activity has been created for ${selectedGroup?.name}`);
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
        items={upcomingActivities}
        renderer={(item) => (
          <ActivityDetailDialog
            group={selectedGroup}
            refreshList={activitiesQuery.refetch}
            activity={item}>
            <div>
              <ActivityCard
                activity={item}
                key={item.id}
              />
            </div>
          </ActivityDetailDialog>
        )}
      />
      {selectedGroup && (
        <ActivityFormDialog
          onSuccessSubmit={onCreateActivitySuccess}
          group={selectedGroup}>
          <div>
            <FloatingMenu />
          </div>
        </ActivityFormDialog>
      )}
      {selectedGroup && (
        <GroupInviteDialog
          title='Success'
          description='Your new group has been created! use the link below to invite your friend into this group'
          group={selectedGroup}
          open={openInviteDialog}
          setOpen={setOpenInviteDialog}
        />
      )}
    </div>
  );
}
