'use client';

import { SupabaseClient, User, UserResponse } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from '../supabase/client';
import initQueryFunctions from '../api/ActivitiesApi';
import { useQuery } from '@tanstack/react-query';

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

  const getUser = async () => {
    try {
      const res = await supabase.auth.getSession();
      return res.data.session?.user ?? null;
    } catch (error) {
      return null;
    }
  };

  const { data } = useQuery({ queryKey: ['user'], queryFn: getUser });

  const user = data ?? null;

  const queryFunctions = useMemo(() => initQueryFunctions(supabase), [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, user, ...queryFunctions }}>{props.children}</SupabaseContext.Provider>
  );
};

const useSupabase = () => {
  const contextValues = useContext(SupabaseContext);

  return { ...contextValues };
};

export { SupabaseProvider, useSupabase };
