import { useSupabase } from '@/utils/context/supabaseContext';
import { Children, PropsWithChildren } from 'react';

const AuthGuard = (props: PropsWithChildren) => {
  const { supabase } = useSupabase();

  const children = props.children;
};
