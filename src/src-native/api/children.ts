import { supabase } from './supabaseClient';
import { Child, ChildInput, ChildWithParent, ChildWithLogs } from '../types';

/**
 * Get all children for current user (parent)
 */
export async function getMyChildren(): Promise<Child[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', user.id)
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get all children (staff only)
 */
export async function getAllChildren(filters?: {
  group?: string;
  status?: 'present' | 'absent';
}): Promise<Child[]> {
  let query = supabase.from('children').select('*');

  if (filters?.group) {
    query = query.eq('group', filters.group);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get children with parent info
 */
export async function getChildrenWithParents(group?: string): Promise<ChildWithParent[]> {
  let query = supabase
    .from('children')
    .select(`
      *,
      parent:profiles(*)
    `);

  if (group) {
    query = query.eq('group', group);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get child by ID
 */
export async function getChild(id: string): Promise<Child | null> {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get child with attendance logs
 */
export async function getChildWithLogs(id: string): Promise<ChildWithLogs | null> {
  const { data, error } = await supabase
    .from('children')
    .select(`
      *,
      attendance_logs(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new child
 */
export async function createChild(input: ChildInput): Promise<Child> {
  const { data, error } = await supabase
    .from('children')
    .insert([input])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update child
 */
export async function updateChild(id: string, updates: Partial<ChildInput>): Promise<Child> {
  const { data, error } = await supabase
    .from('children')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete child
 */
export async function deleteChild(id: string): Promise<void> {
  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Check in child
 */
export async function checkInChild(id: string): Promise<Child> {
  return updateChild(id, {
    status: 'present',
  });
}

/**
 * Check out child
 */
export async function checkOutChild(id: string): Promise<Child> {
  return updateChild(id, {
    status: 'absent',
  });
}

/**
 * Get children by group
 */
export async function getChildrenByGroup(group: string): Promise<Child[]> {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('group', group)
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get present children
 */
export async function getPresentChildren(group?: string): Promise<Child[]> {
  let query = supabase
    .from('children')
    .select('*')
    .eq('status', 'present');

  if (group) {
    query = query.eq('group', group);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get absent children
 */
export async function getAbsentChildren(group?: string): Promise<Child[]> {
  let query = supabase
    .from('children')
    .select('*')
    .eq('status', 'absent');

  if (group) {
    query = query.eq('group', group);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}
