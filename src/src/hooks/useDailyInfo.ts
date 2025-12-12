import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDailyInfo,
  getTodayDailyInfo,
  getUpcomingDailyInfo,
  createDailyInfo,
  updateDailyInfo,
  deleteDailyInfo,
} from '../api/dailyInfo';
import { DailyInfo, DailyInfoInput } from '../types/dailyInfo';

/**
 * Hook to fetch all daily info with optional filters
 */
export function useDailyInfo(filters?: { date?: string; target_group?: string }) {
  return useQuery({
    queryKey: ['dailyInfo', filters],
    queryFn: () => getDailyInfo(filters),
  });
}

/**
 * Hook to fetch today's daily info
 */
export function useTodayDailyInfo(target_group?: string) {
  return useQuery({
    queryKey: ['dailyInfo', 'today', target_group],
    queryFn: () => getTodayDailyInfo(target_group),
  });
}

/**
 * Hook to fetch upcoming daily info
 */
export function useUpcomingDailyInfo(target_group?: string) {
  return useQuery({
    queryKey: ['dailyInfo', 'upcoming', target_group],
    queryFn: () => getUpcomingDailyInfo(target_group),
  });
}

/**
 * Hook to create daily info
 */
export function useCreateDailyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DailyInfoInput) => createDailyInfo(input),
    onSuccess: () => {
      // Invalidate all daily info queries to refetch
      queryClient.invalidateQueries({ queryKey: ['dailyInfo'] });
    },
  });
}

/**
 * Hook to update daily info
 */
export function useUpdateDailyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<DailyInfoInput> }) =>
      updateDailyInfo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyInfo'] });
    },
  });
}

/**
 * Hook to delete daily info
 */
export function useDeleteDailyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDailyInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyInfo'] });
    },
  });
}

/**
 * Hook with all daily info mutations
 */
export function useDailyInfoMutations() {
  const create = useCreateDailyInfo();
  const update = useUpdateDailyInfo();
  const remove = useDeleteDailyInfo();

  return {
    create,
    update,
    delete: remove,
    isLoading: create.isPending || update.isPending || remove.isPending,
  };
}
