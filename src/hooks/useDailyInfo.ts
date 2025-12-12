import { useState, useEffect, useCallback } from 'react';
import { DailyInfo, DailyInfoInput } from '../types/dailyInfo';
import {
  getDailyInfo,
  getTodayDailyInfo,
  getUpcomingDailyInfo,
  createDailyInfo,
  updateDailyInfo,
  deleteDailyInfo,
} from '../api/dailyInfo';

interface UseDailyInfoOptions {
  targetGroup?: string;
  autoFetch?: boolean;
}

export function useDailyInfo(options?: UseDailyInfoOptions) {
  const [dailyInfo, setDailyInfo] = useState<DailyInfo[]>([]);
  const [todayInfo, setTodayInfo] = useState<DailyInfo[]>([]);
  const [upcomingInfo, setUpcomingInfo] = useState<DailyInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { targetGroup, autoFetch = true } = options || {};

  // Fetch all daily info
  const fetchDailyInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDailyInfo({ targetGroup });
      setDailyInfo(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [targetGroup]);

  // Fetch today's info
  const fetchTodayInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodayDailyInfo(targetGroup);
      setTodayInfo(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [targetGroup]);

  // Fetch upcoming info
  const fetchUpcomingInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUpcomingDailyInfo(targetGroup);
      setUpcomingInfo(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [targetGroup]);

  // Fetch all (today + upcoming)
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [today, upcoming] = await Promise.all([
        getTodayDailyInfo(targetGroup),
        getUpcomingDailyInfo(targetGroup),
      ]);
      setTodayInfo(today);
      setUpcomingInfo(upcoming);
      setDailyInfo([...today, ...upcoming]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [targetGroup]);

  // Create new daily info
  const create = useCallback(async (input: DailyInfoInput) => {
    try {
      setLoading(true);
      setError(null);
      const newItem = await createDailyInfo(input);
      setDailyInfo((prev) => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update daily info
  const update = useCallback(async (id: string, updates: Partial<DailyInfoInput>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await updateDailyInfo(id, updates);
      setDailyInfo((prev) => prev.map((item) => (item.id === id ? updatedItem : item)));
      return updatedItem;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete daily info
  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteDailyInfo(id);
      setDailyInfo((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh all data
  const refresh = useCallback(() => {
    return fetchAll();
  }, [fetchAll]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchAll();
    }
  }, [autoFetch, fetchAll]);

  return {
    dailyInfo,
    todayInfo,
    upcomingInfo,
    loading,
    error,
    fetchDailyInfo,
    fetchTodayInfo,
    fetchUpcomingInfo,
    fetchAll,
    create,
    update,
    remove,
    refresh,
  };
}
