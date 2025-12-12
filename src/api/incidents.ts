import { supabase } from './supabaseClient';
import { Incident, IncidentInput, IncidentWithChild } from '../types';

/**
 * Get incidents for a child
 */
export async function getChildIncidents(childId: string): Promise<Incident[]> {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all incidents (staff only)
 */
export async function getAllIncidents(filters?: {
  severity?: 'low' | 'medium' | 'high';
  type?: 'injury' | 'illness' | 'behavior' | 'other';
  notifiedParents?: boolean;
}): Promise<IncidentWithChild[]> {
  let query = supabase
    .from('incidents')
    .select(`
      *,
      child:children(*)
    `);

  if (filters?.severity) {
    query = query.eq('severity', filters.severity);
  }

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.notifiedParents !== undefined) {
    query = query.eq('notified_parents', filters.notifiedParents);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get recent incidents (last 7 days)
 */
export async function getRecentIncidents(days: number = 7): Promise<IncidentWithChild[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('incidents')
    .select(`
      *,
      child:children(*)
    `)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get incidents by severity
 */
export async function getIncidentsBySeverity(
  severity: 'low' | 'medium' | 'high'
): Promise<IncidentWithChild[]> {
  return getAllIncidents({ severity });
}

/**
 * Get unnotified incidents (staff only)
 */
export async function getUnnotifiedIncidents(): Promise<IncidentWithChild[]> {
  return getAllIncidents({ notifiedParents: false });
}

/**
 * Create incident (staff only)
 */
export async function createIncident(input: IncidentInput): Promise<Incident> {
  const { data: { user } } = await supabase.auth.getUser();

  const incidentData = {
    ...input,
    reported_by: input.reported_by || user?.id,
  };

  const { data, error } = await supabase
    .from('incidents')
    .insert([incidentData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update incident (staff only)
 */
export async function updateIncident(
  id: string,
  updates: Partial<IncidentInput>
): Promise<Incident> {
  const { data, error } = await supabase
    .from('incidents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark parents as notified
 */
export async function markParentsNotified(id: string): Promise<Incident> {
  return updateIncident(id, { notified_parents: true });
}

/**
 * Delete incident (staff only)
 */
export async function deleteIncident(id: string): Promise<void> {
  const { error } = await supabase
    .from('incidents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Get incidents for my children (parent)
 */
export async function getMyChildrenIncidents(): Promise<IncidentWithChild[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('incidents')
    .select(`
      *,
      child:children!inner(*)
    `)
    .eq('child.parent_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get today's incidents
 */
export async function getTodayIncidents(): Promise<IncidentWithChild[]> {
  const today = new Date().toISOString().split('T')[0];
  const startOfDay = `${today}T00:00:00`;
  const endOfDay = `${today}T23:59:59`;

  const { data, error } = await supabase
    .from('incidents')
    .select(`
      *,
      child:children(*)
    `)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get incident statistics
 */
export async function getIncidentStats(days: number = 30): Promise<{
  total: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  notified: number;
  unnotified: number;
}> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('incidents')
    .select('type, severity, notified_parents')
    .gte('created_at', startDate.toISOString());

  if (error) throw error;

  const incidents = data || [];
  const byType: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};
  let notified = 0;
  let unnotified = 0;

  incidents.forEach((incident) => {
    byType[incident.type] = (byType[incident.type] || 0) + 1;
    bySeverity[incident.severity] = (bySeverity[incident.severity] || 0) + 1;
    if (incident.notified_parents) {
      notified++;
    } else {
      unnotified++;
    }
  });

  return {
    total: incidents.length,
    byType,
    bySeverity,
    notified,
    unnotified,
  };
}
