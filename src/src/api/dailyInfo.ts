import { supabase } from './supabaseClient';
import { DailyInfo, DailyInfoInput } from '../types/dailyInfo';

/**
 * Fetch all daily info items
 * Optionally filter by date or target_group
 */
export async function getDailyInfo(filters?: {
  date?: string;
  target_group?: string;
}): Promise<DailyInfo[]> {
  let query = supabase
    .from('daily_info')
    .select('*')
    .order('date', { ascending: false });

  if (filters?.date) {
    query = query.eq('date', filters.date);
  }

  if (filters?.target_group) {
    query = query.or(`target_group.eq.${filters.target_group},target_group.is.null`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

/**
 * Get daily info for today
 */
export async function getTodayDailyInfo(target_group?: string): Promise<DailyInfo[]> {
  const today = new Date().toISOString().split('T')[0];
  return getDailyInfo({ date: today, target_group });
}

/**
 * Get upcoming daily info (future dates)
 */
export async function getUpcomingDailyInfo(target_group?: string): Promise<DailyInfo[]> {
  const today = new Date().toISOString().split('T')[0];
  
  let query = supabase
    .from('daily_info')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true });

  if (target_group) {
    query = query.or(`target_group.eq.${target_group},target_group.is.null`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

/**
 * Create a new daily info item
 */
export async function createDailyInfo(input: DailyInfoInput): Promise<DailyInfo> {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('daily_info')
    .insert([{ ...input, created_by: user?.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing daily info item
 */
export async function updateDailyInfo(
  id: string,
  updates: Partial<DailyInfoInput>
): Promise<DailyInfo> {
  const { data, error } = await supabase
    .from('daily_info')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a daily info item
 */
export async function deleteDailyInfo(id: string): Promise<void> {
  const { error } = await supabase
    .from('daily_info')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Batch create multiple daily info items
 */
export async function batchCreateDailyInfo(inputs: DailyInfoInput[]): Promise<DailyInfo[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  const itemsWithCreator = inputs.map(item => ({
    ...item,
    created_by: user?.id,
  }));

  const { data, error } = await supabase
    .from('daily_info')
    .insert(itemsWithCreator)
    .select();

  if (error) throw error;
  return data || [];
}
