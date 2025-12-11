import { createClient } from '@supabase/supabase-js';
import type { Database } from './api-types';

// Supabase client configuration
// Get these from your Supabase project settings: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file
// Note: If not configured, the app will use demo/mock data as fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ============================================
// AUTH SERVICES
// ============================================

export const authService = {
  /**
   * Sign up new user
   */
  async signUp(email: string, password: string, metadata?: { full_name?: string; phone?: string; role?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    
    if (error) throw error;
    return data;
  },

  /**
   * Sign in existing user
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  /**
   * Update user password
   */
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    return data;
  },
};

// ============================================
// PROFILE SERVICES
// ============================================

export const profileService = {
  /**
   * Get user profile by ID
   */
  async getProfile(userId: string) {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .update(updates as any)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete user account (GDPR)
   */
  async deleteAccount(userId: string) {
    // This will cascade delete all related data due to RLS policies
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
  },
};

// ============================================
// CHILDREN SERVICES
// ============================================

export const childrenService = {
  /**
   * Get all children (for staff) or children by parent (for parents)
   */
  async getChildren(parentId?: string): Promise<Database['public']['Tables']['children']['Row'][]> {
    let query = supabase
      .from('children')
      .select('*')
      .order('name', { ascending: true });
    
    if (parentId) {
      query = query.eq('parent_id', parentId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Get single child by ID
   */
  async getChild(childId: string) {
    const { data, error } = await (supabase as any)
      .from('children')
      .select('*')
      .eq('id', childId)
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Create new child
   */
  async createChild(child: Database['public']['Tables']['children']['Insert']) {
    const { data, error } = await (supabase as any)
      .from('children')
      .insert(child as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update child
   */
  async updateChild(childId: string, updates: Database['public']['Tables']['children']['Update']) {
    const { data, error } = await (supabase as any)
      .from('children')
      .update(updates as any)
      .eq('id', childId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete child
   */
  async deleteChild(childId: string) {
    const { error } = await supabase
      .from('children')
      .delete()
      .eq('id', childId);
    
    if (error) throw error;
  },
};

// ============================================
// ATTENDANCE SERVICES
// ============================================

export const attendanceService = {
  /**
   * Check in child
   */
  async checkIn(childId: string, verifiedBy: string) {
    const { data, error } = await (supabase as any)
      .from('attendance_logs')
      .insert({
        child_id: childId,
        action: 'check_in',
        verified_by: verifiedBy,
      } as any)
      .select()
      .single();
    
    if (error) throw error;

    // Update child status
    await childrenService.updateChild(childId, {
      status: 'present',
      check_in_time: new Date().toISOString(),
    });

    return data;
  },

  /**
   * Check out child
   */
  async checkOut(childId: string, verifiedBy: string) {
    const { data, error } = await (supabase as any)
      .from('attendance_logs')
      .insert({
        child_id: childId,
        action: 'check_out',
        verified_by: verifiedBy,
      } as any)
      .select()
      .single();
    
    if (error) throw error;

    // Update child status
    await childrenService.updateChild(childId, {
      status: 'absent',
      check_out_time: new Date().toISOString(),
    });

    return data;
  },

  /**
   * Get attendance logs for a child
   */
  async getAttendanceLogs(childId: string, limit = 50): Promise<Database['public']['Tables']['attendance_logs']['Row'][]> {
    const { data, error } = await (supabase as any)
      .from('attendance_logs')
      .select('*')
      .eq('child_id', childId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },
};

// ============================================
// APPROVED PERSONS SERVICES
// ============================================

export const approvedPersonsService = {
  /**
   * Get approved persons for a child
   */
  async getApprovedPersons(childId: string) {
    const { data, error } = await (supabase as any)
      .from('approved_persons')
      .select('*')
      .eq('child_id', childId)
      .order('full_name', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  /**
   * Add approved person
   */
  async addApprovedPerson(person: Database['public']['Tables']['approved_persons']['Insert']) {
    const { data, error } = await (supabase as any)
      .from('approved_persons')
      .insert(person as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update approved person status
   */
  async updateApprovedPerson(personId: string, updates: Database['public']['Tables']['approved_persons']['Update']) {
    const { data, error } = await (supabase as any)
      .from('approved_persons')
      .update(updates as any)
      .eq('id', personId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete approved person
   */
  async deleteApprovedPerson(personId: string) {
    const { error } = await supabase
      .from('approved_persons')
      .delete()
      .eq('id', personId);
    
    if (error) throw error;
  },
};

// ============================================
// INCIDENTS SERVICES
// ============================================

export const incidentsService = {
  /**
   * Get incidents for a child
   */
  async getIncidents(childId: string): Promise<Database['public']['Tables']['incidents']['Row'][]> {
    const { data, error } = await (supabase as any)
      .from('incidents')
      .select('*')
      .eq('child_id', childId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Create incident report
   */
  async createIncident(incident: Database['public']['Tables']['incidents']['Insert']) {
    const { data, error } = await (supabase as any)
      .from('incidents')
      .insert(incident as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update incident (e.g., mark as read)
   */
  async updateIncident(incidentId: string, updates: Database['public']['Tables']['incidents']['Update']) {
    const { data, error } = await (supabase as any)
      .from('incidents')
      .update(updates as any)
      .eq('id', incidentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// ============================================
// DAILY INFO SERVICES
// ============================================

export const dailyInfoService = {
  /**
   * Get daily info for a date
   */
  async getDailyInfo(date?: string): Promise<Database['public']['Tables']['daily_info']['Row'][]> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const { data, error } = await (supabase as any)
      .from('daily_info')
      .select('*')
      .eq('date', targetDate)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Create daily info
   */
  async createDailyInfo(info: Database['public']['Tables']['daily_info']['Insert']): Promise<Database['public']['Tables']['daily_info']['Row']> {
    const { data, error } = await (supabase as any)
      .from('daily_info')
      .insert(info as any)
      .select()
      .single();
    
    if (error) throw error;
    return data!;
  },

  /**
   * Update daily info
   */
  async updateDailyInfo(infoId: string, updates: Database['public']['Tables']['daily_info']['Update']) {
    const { data, error } = await (supabase as any)
      .from('daily_info')
      .update(updates as any)
      .eq('id', infoId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete daily info
   */
  async deleteDailyInfo(infoId: string) {
    const { error } = await supabase
      .from('daily_info')
      .delete()
      .eq('id', infoId);
    
    if (error) throw error;
  },
};

// ============================================
// MESSAGES/CHAT SERVICES
// ============================================

export const messagesService = {
  /**
   * Get messages between two users
   */
  async getMessages(userId1: string, userId2: string) {
    const { data, error } = await (supabase as any)
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  /**
   * Send message
   */
  async sendMessage(message: Database['public']['Tables']['messages']['Insert']) {
    const { data, error } = await (supabase as any)
      .from('messages')
      .insert(message as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string) {
    const { data, error } = await ((supabase as any).from('messages') as any)
      .update({ read: true } as any)
      .eq('id', messageId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to new messages (realtime)
   */
  subscribeToMessages(userId: string, callback: (message: any) => void) {
    return supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  },
};

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

export const realtimeService = {
  /**
   * Subscribe to children updates
   */
  subscribeToChildren(callback: (payload: any) => void) {
    return supabase
      .channel('children')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'children',
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to attendance logs
   */
  subscribeToAttendance(callback: (payload: any) => void) {
    return supabase
      .channel('attendance')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'attendance_logs',
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to incidents
   */
  subscribeToIncidents(childId: string, callback: (payload: any) => void) {
    return supabase
      .channel('incidents')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'incidents',
          filter: `child_id=eq.${childId}`,
        },
        callback
      )
      .subscribe();
  },
};

// ============================================
// CONSENT TRACKING SERVICES (GDPR)
// ============================================

export const consentService = {
  /**
   * Get user's consent preferences
   */
  async getConsentPreferences(userId: string) {
    const { data, error } = await (supabase as any)
      .from('consent_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // No consent record yet, return defaults
      return {
        user_id: userId,
        data_sharing: false,
        analytics: true,
        email_notifications: true,
        push_notifications: true,
      };
    }
    
    if (error) throw error;
    return data;
  },

  /**
   * Save user's consent preferences
   */
  async saveConsentPreferences(userId: string, preferences: {
    data_sharing?: boolean;
    analytics?: boolean;
    email_notifications?: boolean;
    push_notifications?: boolean;
  }) {
    const { data, error } = await (supabase as any)
      .from('consent_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        last_updated: new Date().toISOString(),
      } as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete user's consent preferences (called on account deletion)
   */
  async deleteConsentPreferences(userId: string) {
    const { error } = await supabase
      .from('consent_preferences')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  },
};

// ============================================
// DATA EXPORT SERVICES (GDPR Art. 20)
// ============================================

export const dataExportService = {
  /**
   * Export all user data as JSON (GDPR Art. 15 & 20)
   */
  async exportUserData(userId: string) {
    try {
      const [profile, children, logs, incidents, messages, consent] = await Promise.all([
        profileService.getProfile(userId).catch(() => null),
        childrenService.getChildren(userId).catch(() => []),
        attendanceService.getAttendanceLogs('').catch(() => []),
        incidentsService.getIncidents('').catch(() => []),
        messagesService.getMessages(userId, '').catch(() => []),
        consentService.getConsentPreferences(userId).catch(() => null),
      ]);

      const exportData = {
        exportDate: new Date().toISOString(),
        profile,
        children,
        attendanceLogs: logs,
        incidents,
        messages,
        consentPreferences: consent,
        note: 'This is your personal data export from Hentetjeneste. GDPR Art. 20 - Right to data portability',
      };

      return exportData;
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw error;
    }
  },

  /**
   * Download user data as JSON file
   */
  async downloadUserDataAsJSON(userId: string, fullName: string) {
    const data = await this.exportUserData(userId);
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hentetjeneste-export-${fullName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Download user data as CSV
   */
  async downloadUserDataAsCSV(userId: string, fullName: string) {
    const data = await this.exportUserData(userId);
    
    // Flatten data to CSV
    let csv = 'Hentetjeneste Data Export - GDPR Article 20\n';
    csv += `Export Date: ${data.exportDate}\n\n`;
    
    // Profile section
    if (data.profile) {
      csv += 'PROFILE,\n';
      csv += `Email,${data.profile.email}\n`;
      csv += `Name,${data.profile.full_name}\n`;
      csv += `Phone,${data.profile.phone}\n`;
      csv += `Role,${data.profile.role}\n\n`;
    }
    
    // Children section
    if (data.children.length > 0) {
      csv += 'CHILDREN,\n';
      csv += 'Name,Date of Birth,Group,Status\n';
      data.children.forEach((child: any) => {
        csv += `${child.name},${child.date_of_birth},${child.group},${child.status}\n`;
      });
      csv += '\n';
    }
    
    // Messages count
    csv += 'MESSAGES,\n';
    csv += `Total Messages,${data.messages?.length || 0}\n\n`;
    
    // Consent preferences
    if (data.consentPreferences) {
      csv += 'CONSENT PREFERENCES,\n';
      csv += `Data Sharing,${data.consentPreferences.data_sharing}\n`;
      csv += `Analytics,${data.consentPreferences.analytics}\n`;
      csv += `Email Notifications,${data.consentPreferences.email_notifications}\n`;
      csv += `Push Notifications,${data.consentPreferences.push_notifications}\n`;
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hentetjeneste-export-${fullName}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};
