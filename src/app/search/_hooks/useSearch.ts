"use client"
import { getVenuesSearch } from "@/app/actions/venueAction"
import { useQuery } from "@tanstack/react-query"

export const useVenueSearch = (query: string) => {
  // Query Key Factory
  const searchKeys = {
    all: ["search"] as const,
    lists: () => [...searchKeys.all, "list"] as const,
    list: (query: string) => [...searchKeys.lists(), query] as const,
  }

  return useQuery({
    queryKey: searchKeys.list(query),
    queryFn: () => getVenuesSearch(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
