import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert, TablesUpdate } from '@/types/database.types';

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

  const getGroup = async (groupId: Tables<'user_group'>['id']) => {
    return await supabase.from('user_group').select('*').eq('id', groupId).returns<Tables<'user_group'>>();
  };

  const getGroupInvite = async (groupId: Tables<'user_group'>['id']) => {
    return await supabase.from('user_group_invite').select('*').eq('group_id', groupId).eq('is_used', false).single();
  };

  const createGroup = async (input: { name: string }): Promise<PostgrestSingleResponse<Tables<'user_group'>[]>> => {
    const res = await supabase.from('user_group').insert({ name: input.name }).select();
    if (res.error) return res;
    const groupId = res.data && res.data[0].id;
    const relationRes = await supabase.from('user_group_relation').insert({ group_id: groupId });
    const inviteRes = await supabase.from('user_group_invite').insert({ group_id: groupId });
    return res;
  };

  const createGroupInvite = async (groupId: Tables<'user_group'>['id']) => {
    return supabase.from('user_group_invite').insert({ group_id: groupId }).select();
  };

  const updateGroup = async (input: Partial<Tables<'user_group'>>) => {
    return await supabase.from('user_group').update(input).select();
  };

  const getGroupActivity = async (groupId?: number): Promise<PostgrestSingleResponse<Tables<'activity'>[]>> => {
    if (!groupId) return badRequestResponse;
    return supabase
      .from('activity_group_relation')
      .select('...activity(*)')
      .eq('group_id', groupId)
      .returns<Tables<'activity'>[]>();
  };

  const createActivity = async (activity: TablesInsert<'activity'>, groupId: Tables<'user_group'>['id']) => {
    const createActivityRes = await supabase.from('activity').insert(activity).select();
    const newActivityId = createActivityRes.data && createActivityRes.data[0].id;
    if (newActivityId) {
      const createRelationRes = await supabase
        .from('activity_group_relation')
        .insert({ group_id: groupId, activity_id: newActivityId });
    }
    return createActivityRes;
  };

  const updateActivity = async (activity: TablesUpdate<'activity'>) => {
    return supabase.from('activity').update(activity).eq('id', activity.id!).select();
  };

  const deleteActivity = async (activityId: Tables<'activity'>['id']) => {
    return supabase.from('activity').delete().eq('id', activityId).select();
  };

  const markActivityCheck = async (activityId: Tables<'activity'>['id']) => {
    return supabase.from('activity').update({ checked: true }).eq('id', activityId).select();
  };

  return {
    getUserGroups,
    getGroupActivity,
    getGroup,
    getGroupInvite,
    createGroup,
    createGroupInvite,
    updateGroup,
    createActivity,
    updateActivity,
    deleteActivity,
    markActivityCheck,
  };
};

const unauthenticatedResponse: PostgrestSingleResponse<any> = {
  data: null,
  count: null,
  status: 401,
  statusText: 'unauthenticated',
  error: { code: '404', message: 'unautenticated', details: 'unauthenticated', hint: 'not signed in' },
};

const badRequestResponse: PostgrestSingleResponse<any> = {
  data: null,
  count: null,
  status: 400,
  statusText: 'Bad Request',
  error: { code: '404', message: 'Bad Request', details: 'Bad Request', hint: 'Bad Request' },
};

const buildErrorResponse = <T>(input: { status: number; message: string }): PostgrestSingleResponse<T> => {
  return {
    data: null,
    count: null,
    status: input.status,
    statusText: input.message,
    error: { code: '404', message: input.message, details: input.message, hint: input.message },
  };
};

export default initQueryFunctions;
