import { createClient } from '../supabase/client';

const signIn = async (values: { email: string; password: string }) => {
  const { email, password } = values;
  const supabase = createClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const signUp = async (values: { email: string; password: string }) => {
  const { email, password } = values;
  const supabase = createClient();

  const host = window?.location?.host;

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${host}/auth/callback`,
    },
  });
};

export { signIn, signUp };
