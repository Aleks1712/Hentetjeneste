export type DailyInfoType = 'menu' | 'activity' | 'announcement';

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

export interface DailyInfoInput {
  date: string;
  type: DailyInfoType;
  title: string;
  description: string;
  target_group?: string | null;
}
