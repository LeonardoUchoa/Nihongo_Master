import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase, type Database, type ProfileLevel } from '../../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

type AuthContextValue = {
  isConfigured: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, level: ProfileLevel) => Promise<{ needsConfirmation: boolean }>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function requireSupabase() {
  if (!supabase) {
    throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para usar o login.');
  }

  return supabase;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (!supabase || !session?.user) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) {
      setProfile(null);
      return;
    }

    setProfile(data);
  };

  useEffect(() => {
    refreshProfile();
  }, [session?.user?.id]);

  const value = useMemo<AuthContextValue>(() => ({
    isConfigured: isSupabaseConfigured,
    isLoading,
    session,
    user: session?.user ?? null,
    profile,
    async signIn(email, password) {
      const client = requireSupabase();
      const { data, error } = await client.auth.signInWithPassword({ email, password });

      if (error) throw error;

      setSession(data.session);
    },
    async signUp(email, password, level) {
      const client = requireSupabase();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: { level },
        },
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
      }

      return { needsConfirmation: !data.session };
    },
    async resetPassword(email) {
      const client = requireSupabase();
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) throw error;
    },
    async signInWithGoogle() {
      const client = requireSupabase();
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) throw error;
    },
    async signOut() {
      const client = requireSupabase();
      const { error } = await client.auth.signOut();

      if (error) throw error;

      setSession(null);
      setProfile(null);
    },
    refreshProfile,
  }), [isLoading, profile, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
