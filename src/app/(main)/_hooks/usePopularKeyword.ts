"use client"

import { getPopularKeywords } from "@/app/actions/venueAction"
import { useQuery } from "@tanstack/react-query"

export const usePopularVenues = () => {
  return useQuery({
    queryKey: ["popularVenues"],
    queryFn: () => getPopularKeywords(),
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  })
}
