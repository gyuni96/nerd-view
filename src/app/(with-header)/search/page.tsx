'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useSearch } from '@/hooks/queries';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useSearch(query);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">검색 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-destructive">검색에 실패했습니다. {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* 광고 배너 영역 */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">광고 영역</p>
          <p className="mt-1 text-sm sm:text-base">🎫 티켓 예매는 여기서!</p>
        </div>
      </div>

      {/* 공연장 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={venue.image_url}
                    alt={venue.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="mb-2 text-base sm:text-lg">{venue.name}</h3>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{venue.address}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{venue.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
