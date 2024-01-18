'use client';

import { SupabaseClient, User, UserResponse } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from '../supabase/client';
import initQueryFunctions from '../api/ActivitiesApi';

type SupabaseContext = {
  supabase: SupabaseClient;
  user: User | null;
} & ReturnType<typeof initQueryFunctions>;

const initialClient = createClient();

const SupabaseContext = createContext<SupabaseContext>({
  supabase: initialClient,
  user: null,
  ...initQueryFunctions(initialClient),
});

const SupabaseProvider = (props: PropsWithChildren) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  const queryFunctions = useMemo(() => initQueryFunctions(supabase), [supabase]);

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user));
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, user, ...queryFunctions }}>{props.children}</SupabaseContext.Provider>
  );
};

const useSupabase = () => {
  const contextValues = useContext(SupabaseContext);

  return { ...contextValues };
};

export { SupabaseProvider, useSupabase };
