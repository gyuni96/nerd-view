"use client"

import { Search } from "lucide-react"
import { useVenueSearch } from "../_hooks/useSearch"
import SearchResultCard from "./SearchResultCard"
import { useHeader } from "../../../hooks/useHeader"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultListProps {
  query: string
}

const SearchResultList = ({ query }: SearchResultListProps) => {
  const { data: venues, isLoading, isError } = useVenueSearch(query)

  const title = `"${query}" 검색 결과`
  const description = venues?.length !== undefined ? `총 ${venues.length}개의 공연장` : "검색 중..."

  // 헤더 업데이트
  useHeader(title, description)

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full h-48 rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 text-center">
        <p className="text-muted-foreground">검색 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    )
  }

  // 검색 결과 없음
  if (!venues || venues.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 text-center">
        <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">{query} 에 대한 검색 결과가 없습니다</h3>
        <p className="text-muted-foreground">다른 검색어로 시도해보세요.</p>
      </div>
    )
  }

  // 검색 결과 표시
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <SearchResultCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  )
}

export default SearchResultList
