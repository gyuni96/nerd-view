import { getSearch } from '@/app/actions/search';
import { useQuery } from '@tanstack/react-query';

// Query Key Factory
export const searchKeys = {
  all: ['search'] as const,
  lists: () => [...searchKeys.all, 'list'] as const,
  list: (query: string) => [...searchKeys.lists(), query] as const,
};

export const useSearch = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: searchKeys.list(query),
    queryFn: () => getSearch(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
