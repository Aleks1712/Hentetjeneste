import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService, supabase } from '../services/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const initialized = useRef(false);
  const isUpdating = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Get initial session
    const initSession = async () => {
      try {
        const currentSession = await authService.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.log('Auth init error (using demo mode):', error);
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth changes - filter out TOKEN_REFRESHED to prevent loops
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        // Ignore TOKEN_REFRESHED events - these are automatic and shouldn't trigger UI updates
        if (event === 'TOKEN_REFRESHED') {
          return;
        }

        // Prevent concurrent updates
        if (isUpdating.current) return;
        isUpdating.current = true;

        try {
          setSession(newSession);
          setUser(newSession?.user ?? null);
        } finally {
          // Small delay to prevent rapid updates
          setTimeout(() => {
            isUpdating.current = false;
          }, 50);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      initialized.current = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

