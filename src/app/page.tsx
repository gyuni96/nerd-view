import { Footer, SearchForm } from '@/components/common';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="size-full">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-8">
        <div className="max-w-3xl w-full text-center">
          {/* 로고 및 타이틀 */}
          <div className="mb-8 sm:mb-12">
            <h1 className="mb-3 sm:mb-4 text-3xl sm:text-5xl">🎤 덕후보자</h1>
            <p className="text-muted-foreground text-base sm:text-lg px-4">콘서트 좌석, 미리 보고 선택하세요</p>
          </div>

          <SearchForm />

          {/* 인기 검색어 */}
          <div className="text-xs sm:text-sm px-4">
            <div className="mb-2 sm:mb-0 sm:inline">
              <span className="text-muted-foreground mr-2 sm:mr-3">인기 검색:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:inline">
              {['잠실실내체육관', '고척스카이돔', 'KSPO DOME'].map((keyword) => (
                <Link
                  key={keyword}
                  href={`/search`}
                  className="text-primary hover:underline px-2 py-1 sm:px-0 sm:py-0 sm:mx-2"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
