"use client"

import { useParams, useRouter } from "next/navigation"
import { VenueData, Section } from "@/types/seat-layout"
import SectionSVG from "./SectionSVG"
import StageSVG from "./StageSVG"
import { useVenues } from "@/app/venues/_hooks/useVenues"
import { calculateViewBox } from "@/lib/utils"

interface VenueViewerProps {
  venueId: string
  className?: string
}

export default function VenueViewer({ venueId, className = "" }: VenueViewerProps) {
  const { data: venueData, isLoading, isError } = useVenues(venueId)

  const router = useRouter()
  const handleSectionClick = (sectionId: string) => {
    // 상세 좌석 페이지로 라우팅
    router.push(`/venues/${venueId}/sections/${sectionId}`)
  }

  return (
    <div className={`venue-viewer ${className}`}>
      {/* 전체 공연장 뷰 */}
      <div className="relative">
        <svg
          viewBox={calculateViewBox(venueData)}
          className="w-full h-[600px] border border-gray-300 bg-white"
        >
          {/* 무대 표시 */}
          {venueData?.stage.map((stage) => (
            <StageSVG stage={stage} key={stage.id} />
          ))}

          {/* 섹션들 렌더링 */}
          {venueData.section.map((section) => (
            <SectionSVG key={section.id} section={section} onClick={handleSectionClick} />
          ))}
        </svg>
      </div>
    </div>
  )
}
