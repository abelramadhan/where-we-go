'use client';

import { SupabaseClient, User, UserResponse } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from '../supabase/client';

type SupabaseContext = {
  supabase: SupabaseClient;
  user: User | null;
};

const SupabaseContext = createContext<SupabaseContext>({ supabase: createClient(), user: null });

const SupabaseProvider = (props: PropsWithChildren) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((res) => setUser(res.data.user));
  }, [supabase]);

  return <SupabaseContext.Provider value={{ supabase, user }}>{props.children}</SupabaseContext.Provider>;
};

const useSupabase = () => {
  const contextValues = useContext(SupabaseContext);

  return { ...contextValues };
};

export { SupabaseProvider, useSupabase };
