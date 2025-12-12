// ============================================
// HENTETJENESTE - TypeScript Types
// ============================================

// User roles
export type UserRole = 'parent' | 'staff' | 'admin';

// Child status
export type ChildStatus = 'present' | 'absent';

// Attendance action
export type AttendanceAction = 'check_in' | 'check_out';

// Approved person status
export type ApprovedPersonStatus = 'approved' | 'pending' | 'rejected';

// Incident type
export type IncidentType = 'injury' | 'illness' | 'behavior' | 'other';

// Incident severity
export type IncidentSeverity = 'low' | 'medium' | 'high';

// Daily info type
export type DailyInfoType = 'menu' | 'activity' | 'announcement';

// ============================================
// DATABASE MODELS
// ============================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  date_of_birth: string | null;
  group: string | null;
  status: ChildStatus;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
  allergies: string | null;
  emergency_contact: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttendanceLog {
  id: string;
  child_id: string;
  action: AttendanceAction;
  timestamp: string;
  verified_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface ApprovedPerson {
  id: string;
  child_id: string;
  name: string;
  relation: string;
  phone: string;
  can_pick_up: boolean;
  photo_url: string | null;
  status: ApprovedPersonStatus;
  created_at: string;
  updated_at: string;
}

export interface Incident {
  id: string;
  child_id: string;
  type: IncidentType;
  description: string;
  severity: IncidentSeverity;
  action_taken: string | null;
  reported_by: string | null;
  notified_parents: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyInfo {
  id: string;
  date: string;
  type: DailyInfoType;
  title: string;
  description: string;
  target_group: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

// ============================================
// INPUT TYPES (for create/update)
// ============================================

export interface ProfileInput {
  email: string;
  full_name?: string;
  phone?: string;
  role?: UserRole;
  avatar_url?: string;
}

export interface ChildInput {
  parent_id: string;
  name: string;
  date_of_birth?: string;
  group?: string;
  status?: ChildStatus;
  notes?: string;
  allergies?: string;
  emergency_contact?: string;
}

export interface AttendanceLogInput {
  child_id: string;
  action: AttendanceAction;
  timestamp?: string;
  verified_by?: string;
  notes?: string;
}

export interface ApprovedPersonInput {
  child_id: string;
  name: string;
  relation: string;
  phone: string;
  can_pick_up?: boolean;
  photo_url?: string;
  status?: ApprovedPersonStatus;
}

export interface IncidentInput {
  child_id: string;
  type: IncidentType;
  description: string;
  severity: IncidentSeverity;
  action_taken?: string;
  reported_by?: string;
  notified_parents?: boolean;
}

export interface DailyInfoInput {
  date: string;
  type: DailyInfoType;
  title: string;
  description: string;
  target_group?: string;
  created_by?: string;
}

export interface MessageInput {
  sender_id: string;
  receiver_id: string;
  content: string;
}

// ============================================
// EXTENDED TYPES (with relations)
// ============================================

export interface ChildWithParent extends Child {
  parent?: Profile;
}

export interface ChildWithLogs extends Child {
  attendance_logs?: AttendanceLog[];
}

export interface ChildWithApprovedPersons extends Child {
  approved_persons?: ApprovedPerson[];
}

export interface IncidentWithChild extends Incident {
  child?: Child;
  reporter?: Profile;
}

export interface MessageWithSender extends Message {
  sender?: Profile;
  receiver?: Profile;
}

export interface AttendanceLogWithChild extends AttendanceLog {
  child?: Child;
  verified_by_profile?: Profile;
}
