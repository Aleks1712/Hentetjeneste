import { supabase } from './supabaseClient';
import { Profile, ProfileInput } from '../types';

/**
 * Get current user's profile
 */
export async function getMyProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get profile by ID
 */
export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all profiles (staff only)
 */
export async function getAllProfiles(role?: string): Promise<Profile[]> {
  let query = supabase.from('profiles').select('*');

  if (role) {
    query = query.eq('role', role);
  }

  const { data, error } = await query.order('full_name');

  if (error) throw error;
  return data || [];
}

/**
 * Get all staff members
 */
export async function getStaffProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .in('role', ['staff', 'admin'])
    .order('full_name');

  if (error) throw error;
  return data || [];
}

/**
 * Update current user's profile
 */
export async function updateMyProfile(updates: Partial<ProfileInput>): Promise<Profile> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update profile by ID (admin/staff only)
 */
export async function updateProfile(id: string, updates: Partial<ProfileInput>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Check if current user is staff or admin
 */
export async function isStaff(): Promise<boolean> {
  const profile = await getMyProfile();
  return profile ? ['staff', 'admin'].includes(profile.role) : false;
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const profile = await getMyProfile();
  return profile?.role === 'admin';
}
