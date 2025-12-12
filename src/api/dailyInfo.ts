import { supabase } from './supabaseClient';
import { DailyInfo, DailyInfoInput } from '../types/dailyInfo';

/**
 * Fetch all daily info items
 * Optionally filter by date or targetGroup
 */
export async function getDailyInfo(filters?: {
  date?: string;
  targetGroup?: string;
}): Promise<DailyInfo[]> {
  let query = supabase
    .from('daily_info')
    .select('*')
    .order('date', { ascending: false });

  if (filters?.date) {
    query = query.eq('date', filters.date);
  }

  if (filters?.targetGroup) {
    query = query.or(`targetGroup.eq.${filters.targetGroup},targetGroup.is.null`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

/**
 * Get daily info for today
 */
export async function getTodayDailyInfo(targetGroup?: string): Promise<DailyInfo[]> {
  const today = new Date().toISOString().split('T')[0];
  return getDailyInfo({ date: today, targetGroup });
}

/**
 * Get upcoming daily info (future dates)
 */
export async function getUpcomingDailyInfo(targetGroup?: string): Promise<DailyInfo[]> {
  const today = new Date().toISOString().split('T')[0];
  
  let query = supabase
    .from('daily_info')
    .select('*')
    .gt('date', today)
    .order('date', { ascending: true });

  if (targetGroup) {
    query = query.or(`targetGroup.eq.${targetGroup},targetGroup.is.null`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

/**
 * Create a new daily info item
 */
export async function createDailyInfo(input: DailyInfoInput): Promise<DailyInfo> {
  const { data, error } = await supabase
    .from('daily_info')
    .insert([input])
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
  const { data, error } = await supabase
    .from('daily_info')
    .insert(inputs)
    .select();

  if (error) throw error;
  return data || [];
}
