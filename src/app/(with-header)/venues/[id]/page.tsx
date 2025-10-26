"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { useVenueDetailQuery } from "@/queries/venues/venue"
import { UniversalVenueLayout } from "@/components/venue/UniversalVenueLayout"
import { concertHallLayout } from "@/data/venue-layouts/concert-hall-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"

const VenueDetailPage = () => {
  const params = useParams()
  const id = params.id as string
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const { data: venue, isLoading, error } = useVenueDetailQuery(id)

  // 섹션 클릭 핸들러
  const handleSectionClick = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">오류 발생</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              공연장 정보를 불러오는데 실패했습니다. {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">공연장 정보를 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 공연장 정보 헤더 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              {venue.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>수용 인원: {venue.capacity?.toLocaleString()}명</span>
              </div>
              <span>{venue.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* 좌석 배치도 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>좌석 배치도</CardTitle>
          </CardHeader>
          <CardContent>
            <UniversalVenueLayout
              layout={concertHallLayout}
              onSectionClick={handleSectionClick}
              selectedSections={selectedSections}
            />
          </CardContent>
        </Card>

        {/* 선택된 구역 정보 */}
        {selectedSections.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>선택된 구역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedSections.map((sectionId) => {
                  const section = concertHallLayout.sections.find((s) => s.id === sectionId)
                  return (
                    <div
                      key={sectionId}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: section?.color + "40", color: section?.color }}
                    >
                      {section?.name}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default VenueDetailPage
