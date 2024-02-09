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

  const origin = window?.location?.origin;

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
};

export { signIn, signUp };
