import { useQuery } from "@tanstack/react-query"
import { createBrowserClient } from "@/lib/supabase"

// Venue 상세 정보 타입 정의
export type VenueDetail = {
  id: string
  name: string
  address: string
  description: string
  image_url: string
  capacity?: number
  created_at?: string
}

// Query Key Factory
export const venueKeys = {
  all: ["venue"] as const,
  details: () => [...venueKeys.all, "detail"] as const,
  detail: (id: string) => [...venueKeys.details(), id] as const,
}

// API 호출 함수
const fetchVenueDetail = async (id: string): Promise<VenueDetail> => {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }

  return data as VenueDetail
}

// React Query Hook
export const useVenueDetailQuery = (id: string) => {
  return useQuery({
    queryKey: venueKeys.detail(id),
    queryFn: () => fetchVenueDetail(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분
  })
}
