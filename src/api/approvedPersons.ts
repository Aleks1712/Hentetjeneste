import { supabase } from './supabaseClient';
import { ApprovedPerson, ApprovedPersonInput } from '../types';

/**
 * Get approved persons for a child
 */
export async function getApprovedPersons(childId: string): Promise<ApprovedPerson[]> {
  const { data, error } = await supabase
    .from('approved_persons')
    .select('*')
    .eq('child_id', childId)
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get approved persons by status
 */
export async function getApprovedPersonsByStatus(
  childId: string,
  status: 'approved' | 'pending' | 'rejected'
): Promise<ApprovedPerson[]> {
  const { data, error } = await supabase
    .from('approved_persons')
    .select('*')
    .eq('child_id', childId)
    .eq('status', status)
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Get all approved pickup persons for a child
 */
export async function getApprovedPickupPersons(childId: string): Promise<ApprovedPerson[]> {
  const { data, error } = await supabase
    .from('approved_persons')
    .select('*')
    .eq('child_id', childId)
    .eq('can_pick_up', true)
    .eq('status', 'approved')
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Create approved person
 */
export async function createApprovedPerson(input: ApprovedPersonInput): Promise<ApprovedPerson> {
  const { data, error } = await supabase
    .from('approved_persons')
    .insert([input])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update approved person
 */
export async function updateApprovedPerson(
  id: string,
  updates: Partial<ApprovedPersonInput>
): Promise<ApprovedPerson> {
  const { data, error } = await supabase
    .from('approved_persons')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete approved person
 */
export async function deleteApprovedPerson(id: string): Promise<void> {
  const { error } = await supabase
    .from('approved_persons')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Approve a person (staff only)
 */
export async function approvePerson(id: string): Promise<ApprovedPerson> {
  return updateApprovedPerson(id, { status: 'approved' });
}

/**
 * Reject a person (staff only)
 */
export async function rejectPerson(id: string): Promise<ApprovedPerson> {
  return updateApprovedPerson(id, { status: 'rejected' });
}

/**
 * Get pending approvals (staff only)
 */
export async function getPendingApprovals(): Promise<ApprovedPerson[]> {
  const { data, error } = await supabase
    .from('approved_persons')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all approved persons for my children (parent)
 */
export async function getMyChildrenApprovedPersons(): Promise<ApprovedPerson[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('approved_persons')
    .select(`
      *,
      child:children!inner(*)
    `)
    .eq('child.parent_id', user.id)
    .order('name');

  if (error) throw error;
  return data || [];
}

/**
 * Bulk create approved persons
 */
export async function createApprovedPersons(
  inputs: ApprovedPersonInput[]
): Promise<ApprovedPerson[]> {
  const { data, error } = await supabase
    .from('approved_persons')
    .insert(inputs)
    .select();

  if (error) throw error;
  return data || [];
}
