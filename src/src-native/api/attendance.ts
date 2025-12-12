import { supabase } from './supabaseClient';
import { AttendanceLog, AttendanceLogInput, AttendanceLogWithChild } from '../types';

/**
 * Get attendance logs for a child
 */
export async function getChildAttendanceLogs(
  childId: string,
  filters?: {
    startDate?: string;
    endDate?: string;
    action?: 'check_in' | 'check_out';
  }
): Promise<AttendanceLog[]> {
  let query = supabase
    .from('attendance_logs')
    .select('*')
    .eq('child_id', childId);

  if (filters?.startDate) {
    query = query.gte('timestamp', filters.startDate);
  }

  if (filters?.endDate) {
    query = query.lte('timestamp', filters.endDate);
  }

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  const { data, error } = await query.order('timestamp', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all attendance logs (staff only)
 */
export async function getAllAttendanceLogs(filters?: {
  date?: string;
  action?: 'check_in' | 'check_out';
}): Promise<AttendanceLogWithChild[]> {
  let query = supabase
    .from('attendance_logs')
    .select(`
      *,
      child:children(*)
    `);

  if (filters?.date) {
    const startOfDay = `${filters.date}T00:00:00`;
    const endOfDay = `${filters.date}T23:59:59`;
    query = query.gte('timestamp', startOfDay).lte('timestamp', endOfDay);
  }

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  const { data, error } = await query.order('timestamp', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get today's attendance logs
 */
export async function getTodayAttendanceLogs(): Promise<AttendanceLogWithChild[]> {
  const today = new Date().toISOString().split('T')[0];
  return getAllAttendanceLogs({ date: today });
}

/**
 * Create attendance log (check in/out)
 */
export async function createAttendanceLog(input: AttendanceLogInput): Promise<AttendanceLog> {
  const { data: { user } } = await supabase.auth.getUser();

  const logData = {
    ...input,
    timestamp: input.timestamp || new Date().toISOString(),
    verified_by: input.verified_by || user?.id,
  };

  const { data, error } = await supabase
    .from('attendance_logs')
    .insert([logData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Check in a child
 */
export async function checkIn(childId: string, notes?: string): Promise<AttendanceLog> {
  const { data: { user } } = await supabase.auth.getUser();

  // Create log
  const log = await createAttendanceLog({
    child_id: childId,
    action: 'check_in',
    notes,
    verified_by: user?.id,
  });

  // Update child status
  await supabase
    .from('children')
    .update({
      status: 'present',
      check_in_time: log.timestamp,
    })
    .eq('id', childId);

  return log;
}

/**
 * Check out a child
 */
export async function checkOut(childId: string, notes?: string): Promise<AttendanceLog> {
  const { data: { user } } = await supabase.auth.getUser();

  // Create log
  const log = await createAttendanceLog({
    child_id: childId,
    action: 'check_out',
    notes,
    verified_by: user?.id,
  });

  // Update child status
  await supabase
    .from('children')
    .update({
      status: 'absent',
      check_out_time: log.timestamp,
    })
    .eq('id', childId);

  return log;
}

/**
 * Get attendance statistics for today
 */
export async function getTodayStats(): Promise<{
  total: number;
  present: number;
  absent: number;
  checkIns: number;
  checkOuts: number;
}> {
  const today = new Date().toISOString().split('T')[0];

  // Get all children count
  const { count: totalCount } = await supabase
    .from('children')
    .select('*', { count: 'exact', head: true });

  // Get present children count
  const { count: presentCount } = await supabase
    .from('children')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'present');

  // Get today's check-ins count
  const { count: checkInsCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .eq('action', 'check_in')
    .gte('timestamp', `${today}T00:00:00`)
    .lte('timestamp', `${today}T23:59:59`);

  // Get today's check-outs count
  const { count: checkOutsCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .eq('action', 'check_out')
    .gte('timestamp', `${today}T00:00:00`)
    .lte('timestamp', `${today}T23:59:59`);

  return {
    total: totalCount || 0,
    present: presentCount || 0,
    absent: (totalCount || 0) - (presentCount || 0),
    checkIns: checkInsCount || 0,
    checkOuts: checkOutsCount || 0,
  };
}

/**
 * Get attendance logs for my children (parent)
 */
export async function getMyChildrenAttendanceLogs(
  startDate?: string,
  endDate?: string
): Promise<AttendanceLogWithChild[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  let query = supabase
    .from('attendance_logs')
    .select(`
      *,
      child:children!inner(*)
    `)
    .eq('child.parent_id', user.id);

  if (startDate) {
    query = query.gte('timestamp', startDate);
  }

  if (endDate) {
    query = query.lte('timestamp', endDate);
  }

  const { data, error } = await query.order('timestamp', { ascending: false });

  if (error) throw error;
  return data || [];
}
