'use client';

import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useEffect, useState } from 'react';
import MapRenderer from '../helper/MapRenderer';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { group } from 'console';
import { twMerge } from 'tailwind-merge';
import ActivityCard from './ActivityCard';

type ActivityListProps = {
  groups?: Tables<'user_group'>[];
};

export default function ActivityList(props: ActivityListProps) {
  const { groups } = props;

  const { getGroupActivity } = useSupabase();
  const [activities, setActivities] = useState<Tables<'activity'>[]>();
  const [selectedGroup, setSelectedGroup] = useState<Tables<'user_group'>>();

  useEffect(() => {
    if (groups && groups.length > 0) {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);

  useEffect(() => {
    if (!selectedGroup) return;
    getGroupActivity(selectedGroup.id).then((res) => setActivities(res.data ?? []));
  }, [selectedGroup]);

  return (
    <div className='space-y-4'>
      <MapRenderer
        className='inline-flex items-center'
        items={groups}
        renderer={(item) => (
          <Badge
            key={item.id}
            variant={item.id === selectedGroup?.id ? 'default' : 'outline'}
            onClick={() => setSelectedGroup(item)}>
            {item.name}
          </Badge>
        )}
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
