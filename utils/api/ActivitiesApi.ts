import { PostgrestResponse, PostgrestSingleResponse, SupabaseClient, User } from '@supabase/supabase-js';
import { useServerClient } from '../supabase/server';
import { Database, Tables } from '@/types/database.types';

const initQueryFunctions = (supabase: SupabaseClient<Database>) => {
  const getUserGroups = async (): Promise<PostgrestSingleResponse<Tables<'user_group'>[]>> => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) return unauthenticatedResponse;
    return supabase
      .from('user_group_relation')
      .select('...user_group (id, name)')
      .eq('user_id', userId!)
      .returns<Tables<'user_group'>[]>();
  };

  const getGroupActivity = (groupId: number) => {
    return supabase
      .from('activity_group_relation')
      .select('...activity(*)')
      .eq('group_id', groupId)
      .returns<Tables<'activity'>[]>();
  };

  return { getUserGroups, getGroupActivity };
};

const unauthenticatedResponse: PostgrestSingleResponse<any> = {
  data: null,
  count: null,
  status: 401,
  statusText: 'unauthenticated',
  error: { code: '404', message: 'unautenticated', details: 'unauthenticated', hint: 'not signed in' },
};

export default initQueryFunctions;
