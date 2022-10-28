import { supabase } from "@/lib/supabase";

const signInWithEmail = async function (email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return !error;
};

export { signInWithEmail };