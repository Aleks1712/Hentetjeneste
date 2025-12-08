// Supabase Client Setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock data.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// GDPR Functions
export const gdprService = {
  // Export user data (Article 15)
  exportUserData: async (userId: string) => {
    const { data, error } = await supabase.rpc('export_user_data', {
      user_uuid: userId,
    });
    if (error) throw error;
    return data;
  },

  // Delete user data (Article 17)
  deleteUserData: async (userId: string) => {
    const { data, error } = await supabase.rpc('delete_user_data', {
      user_uuid: userId,
    });
    if (error) throw error;
    return data;
  },

  // Record consent
  recordConsent: async (userId: string, consentType: string, granted: boolean) => {
    const { data, error } = await supabase.rpc('record_consent', {
      user_uuid: userId,
      consent_type_param: consentType,
      granted_param: granted,
    });
    if (error) throw error;
    return data;
  },

  // Revoke consent
  revokeConsent: async (userId: string, consentType: string) => {
    const { data, error } = await supabase.rpc('revoke_consent', {
      user_uuid: userId,
      consent_type_param: consentType,
    });
    if (error) throw error;
    return data;
  },
};

