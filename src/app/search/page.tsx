import { Metadata } from "next"
import SearchResultList from "./_components/SearchResultList"

export const metadata: Metadata = {
  title: "검색 결과 - 덕후보자",
  description: "공연장 검색 결과",
}

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams
  const query = q || ""

  return (
    <div>
      {/* 광고 배너 영역 */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">광고 영역</p>
          <p className="mt-1 text-sm sm:text-base">🎫 티켓 예매는 여기서!</p>
        </div>
      </div>

      {/* 검색 결과 */}
      {query ? (
        <SearchResultList query={query} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">검색어를 입력해주세요.</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
