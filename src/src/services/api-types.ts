/**
 * Database type definitions for Supabase
 * 
 * This file defines the TypeScript types for all database tables.
 * These types ensure type-safety when working with Supabase queries.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'parent' | 'staff' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'parent' | 'staff' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'parent' | 'staff' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          parent_id: string
          name: string
          date_of_birth: string | null
          group: string | null
          status: 'present' | 'absent'
          check_in_time: string | null
          check_out_time: string | null
          notes: string | null
          allergies: string | null
          emergency_contact: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          date_of_birth?: string | null
          group?: string | null
          status?: 'present' | 'absent'
          check_in_time?: string | null
          check_out_time?: string | null
          notes?: string | null
          allergies?: string | null
          emergency_contact?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          name?: string
          date_of_birth?: string | null
          group?: string | null
          status?: 'present' | 'absent'
          check_in_time?: string | null
          check_out_time?: string | null
          notes?: string | null
          allergies?: string | null
          emergency_contact?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attendance_logs: {
        Row: {
          id: string
          child_id: string
          action: 'check_in' | 'check_out'
          timestamp: string
          verified_by: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          action: 'check_in' | 'check_out'
          timestamp?: string
          verified_by: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          action?: 'check_in' | 'check_out'
          timestamp?: string
          verified_by?: string
          notes?: string | null
          created_at?: string
        }
      }
      approved_persons: {
        Row: {
          id: string
          child_id: string
          name: string
          relation: string
          phone: string
          can_pick_up: boolean
          photo_url: string | null
          status: 'approved' | 'pending' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          name: string
          relation: string
          phone: string
          can_pick_up?: boolean
          photo_url?: string | null
          status?: 'approved' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          name?: string
          relation?: string
          phone?: string
          can_pick_up?: boolean
          photo_url?: string | null
          status?: 'approved' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      incidents: {
        Row: {
          id: string
          child_id: string
          type: 'injury' | 'illness' | 'behavior' | 'other'
          description: string
          severity: 'low' | 'medium' | 'high'
          action_taken: string | null
          reported_by: string
          notified_parents: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          type: 'injury' | 'illness' | 'behavior' | 'other'
          description: string
          severity: 'low' | 'medium' | 'high'
          action_taken?: string | null
          reported_by: string
          notified_parents?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          type?: 'injury' | 'illness' | 'behavior' | 'other'
          description?: string
          severity?: 'low' | 'medium' | 'high'
          action_taken?: string | null
          reported_by?: string
          notified_parents?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      daily_info: {
        Row: {
          id: string
          date: string
          type: 'menu' | 'activity' | 'announcement'
          title: string
          description: string
          target_group: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          type: 'menu' | 'activity' | 'announcement'
          title: string
          description: string
          target_group?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          type?: 'menu' | 'activity' | 'announcement'
          title?: string
          description?: string
          target_group?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'parent' | 'staff' | 'admin'
      child_status: 'present' | 'absent'
      attendance_action: 'check_in' | 'check_out'
      approval_status: 'approved' | 'pending' | 'rejected'
      incident_type: 'injury' | 'illness' | 'behavior' | 'other'
      incident_severity: 'low' | 'medium' | 'high'
      daily_info_type: 'menu' | 'activity' | 'announcement'
    }
  }
}
