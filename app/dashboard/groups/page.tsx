'use client';

import MapRenderer from '@/components/helper/MapRenderer';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/types/database.types';
import initQueryFunctions from '@/utils/api/ActivitiesApi';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useServerClient } from '@/utils/supabase/server';
import { useEffect, useState } from 'react';

export default function GroupsPage() {
  const { getUserGroups, createGroup } = useSupabase();

  const [groups, setGroups] = useState<Tables<'user_group'>[]>();

  useEffect(() => {
    getUserGroups().then((res) => setGroups(res.data ?? undefined));
  }, []);

  return (
    <div className='space-y-4'>
      <div>
        <h4 className='text-lg font-medium'>Groups</h4>
        <p className='text-gray-400 font-light text-sm'>Hello!, you currently have {groups?.length} group(s)</p>
      </div>
      <MapRenderer
        items={groups}
        renderer={(item) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
          </Card>
        )}
      />
    </div>
  );
}
