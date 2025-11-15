"use client"

import { useParams, useRouter } from "next/navigation"
import { VenueData, Section } from "@/types/seat-layout"
import SectionSVG from "./SectionSVG"
import StageSVG from "./StageSVG"

interface VenueViewerProps {
  venueData: VenueData
  className?: string
}

export default function VenueViewer({ venueData, className = "" }: VenueViewerProps) {
  const router = useRouter()
  const params = useParams()
  const venueId = params.id as string

  const handleSectionClick = (section: Section) => {
    // 상세 좌석 페이지로 라우팅
    router.push(`/venues/${venueId}/sections/${section.id}`)
  }

  // SVG 뷰박스 계산 (모든 섹션을 포함하도록)
  const calculateViewBox = () => {
    return "0 0 850 800"
  }

  return (
    <div className={`venue-viewer ${className}`}>
      {/* 전체 공연장 뷰 */}
      <div className="relative">
        <svg
          viewBox={calculateViewBox()}
          className="w-full h-[600px] border border-gray-300 bg-white"
        >
          {/* 무대 표시 */}
          <StageSVG stage={venueData.stage} />

          {/* 섹션들 렌더링 */}
          {venueData.section.map((section) => (
            <SectionSVG
              key={section.id}
              section={section}
              isSelected={false}
              onClick={handleSectionClick}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
