import { useQuery } from "@tanstack/react-query"
import { createBrowserClient } from "@/lib/supabase"

// API 응답 타입 정의
export type SearchResult = {
  address: string
  description: string
  id: string
  name: string
  image_url: string
}

// Query Key Factory
export const searchKeys = {
  all: ["search"] as const,
  lists: () => [...searchKeys.all, "list"] as const,
  list: (query: string) => [...searchKeys.lists(), query] as const,
}

// API 호출 함수
const fetchSearch = async (query: string): Promise<SearchResult[]> => {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from("venues")
    .select("id , address , description , name , image_url")
    .like("name", `%${query}%`)

  console.log(data)

  if (error) {
    throw error
  }

  return data as SearchResult[]
}

// React Query Hook
export const useSearchQuery = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: searchKeys.list(query),
    queryFn: () => fetchSearch(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
