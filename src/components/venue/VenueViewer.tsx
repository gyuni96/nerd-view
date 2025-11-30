"use client"

import { useParams, useRouter } from "next/navigation"
import { VenueData, Section } from "@/types/seat-layout"
import SectionSVG from "./SectionSVG"
import StageSVG from "./StageSVG"
import { useVenues } from "@/app/venues/_hooks/useVenues"

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

  // Path 데이터에서 좌표 추출
  const getPathBounds = (pathData: string) => {
    const numbers = pathData.match(/[\d.]+/g)?.map(Number) || []
    const coords: number[] = []

    for (let i = 0; i < numbers.length; i += 2) {
      if (i + 1 < numbers.length) {
        coords.push(numbers[i], numbers[i + 1])
      }
    }

    if (coords.length === 0) return { minX: 0, minY: 0, maxX: 100, maxY: 100 }

    const xs = coords.filter((_, i) => i % 2 === 0)
    const ys = coords.filter((_, i) => i % 2 === 1)

    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
    }
  }

  const calculateViewBox = () => {
    if (venueData?.section.length === 0) return "0 0 850 800"

    let minX = Infinity,
      minY = Infinity
    let maxX = -Infinity,
      maxY = -Infinity

    // Stage 좌표 포함
    venueData.stage.forEach((stage) => {
      if (stage?.d) {
        const stageBounds = getPathBounds(stage.d)
        minX = Math.min(minX, stageBounds.minX)
        minY = Math.min(minY, stageBounds.minY)
        maxX = Math.max(maxX, stageBounds.maxX)
        maxY = Math.max(maxY, stageBounds.maxY)
      }
    })

    // Section 좌표 계산
    venueData.section.forEach((section) => {
      if (section.d) {
        const bounds = getPathBounds(section.d)
        minX = Math.min(minX, bounds.minX)
        minY = Math.min(minY, bounds.minY)
        maxX = Math.max(maxX, bounds.maxX)
        maxY = Math.max(maxY, bounds.maxY)
      }
    })

    const padding = 20
    const width = maxX - minX + padding * 2
    const height = maxY - minY + padding * 2

    return `${minX - padding} ${minY - padding} ${width} ${height}`
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
