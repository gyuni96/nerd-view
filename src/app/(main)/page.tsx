import { Footer } from "@/components/common"
import SearchForm from "./_components/searchForm"
import { Metadata } from "next"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getPopularKeywords } from "../actions/venueAction"
import PopularVenues from "./_components/popularVenues"

export const metadata: Metadata = {
  title: "덕후보자 - 콘서트 좌석 시야 확인",
  description: "콘서트 좌석을 미리 보고 선택하세요. 공연장별 시야 정보를 제공합니다.",
}

export const Home = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Server-side에서는 캐시만 하고 재요청 방지
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  })

  await queryClient.prefetchQuery({
    queryKey: ["popularVenues"],
    queryFn: getPopularKeywords,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="size-full">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-8">
          <div className="max-w-3xl w-full text-center">
            {/* 로고 및 타이틀 */}
            <div className="mb-8 sm:mb-12">
              <h1 className="mb-3 sm:mb-4 text-3xl sm:text-5xl">🎤 덕후보자</h1>
              <p className="text-muted-foreground text-base sm:text-lg px-4">
                콘서트 좌석, 미리 보고 선택하세요
              </p>
            </div>
            <SearchForm />
            <PopularVenues />
          </div>
          <Footer />
        </div>
      </main>
    </HydrationBoundary>
  )
}

export default Home
