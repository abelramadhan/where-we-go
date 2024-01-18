'use client';

import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useEffect, useState } from 'react';

export default function ActivityList() {
  const { getUserGroups } = useSupabase();
  const [groups, setGroups] = useState<Tables<'user_group'>>();
  const [activities, setActivities] = useState<Tables<'activity'>>();
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {}, []);

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
}
