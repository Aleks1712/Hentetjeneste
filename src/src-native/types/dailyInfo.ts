export interface DailyInfo {
  id: string;
  date: string;
  type: 'menu' | 'activity' | 'announcement';
  title: string;
  description: string;
  targetGroup?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface DailyInfoInput {
  date: string;
  type: 'menu' | 'activity' | 'announcement';
  title: string;
  description: string;
  targetGroup?: string;
}
