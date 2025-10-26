"use client"

import { useState } from "react"
import {
  VenueLayout,
  Section,
  isCircularSection,
  isGridSection,
  isPolygonSection,
  isRectangleSection,
  isCircleSection,
  isPathSection,
} from "@/types/venue-layout"

type UniversalVenueLayoutProps = {
  layout: VenueLayout
  onSectionClick?: (sectionId: string) => void
  selectedSections?: string[]
  className?: string
}

export const UniversalVenueLayout = ({
  layout,
  onSectionClick,
  selectedSections = [],
  className = "",
}: UniversalVenueLayoutProps) => {
  // 호버된 좌석 상태
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // 섹션 색상 결정 (선택/호버 상태 반영)
  const getSectionColor = (section: Section) => {
    if (selectedSections.includes(section.id)) return section.color
    if (hoveredSection === section.id) return section.color

    return section.color
  }

  // 섹션 투명도 결정
  const getSectionOpacity = (section: Section) => {
    if (selectedSections.includes(section.id)) return "0.8"
    if (hoveredSection === section.id) return "0.6"
    return "0.3"
  }

  // 섹션별 렌더링
  const renderSection = (section: Section) => {
    const isClickable = !!onSectionClick
    const isSelected = selectedSections.includes(section.id)
    const isHovered = hoveredSection === section.id

    // 공통 이벤트 핸들러
    const handleClick = () => isClickable && onSectionClick?.(section.id)
    const handleMouseEnter = () => setHoveredSection(section.id)
    const handleMouseLeave = () => setHoveredSection(null)

    // SVG Path 배치
    if (isPathSection(section)) {
      return (
        <g key={section.id}>
          <path
            d={section.pathData}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {/* 호버 시 라벨 표시 */}
          {isHovered && section.labelX && section.labelY && (
            <text
              x={section.labelX}
              y={section.labelY}
              fontSize="10"
              fontWeight="bold"
              fill="#000"
              textAnchor="middle"
              className="pointer-events-none"
            >
              {section.name}
            </text>
          )}
        </g>
      )
    }

    // 다각형 배치
    if (isPolygonSection(section)) {
      const pointsString = section.points.map((p) => p.join(",")).join(" ")
      const centerX =
        section.labelX || section.points.reduce((sum, p) => sum + p[0], 0) / section.points.length
      const centerY =
        section.labelY || section.points.reduce((sum, p) => sum + p[1], 0) / section.points.length

      return (
        <g key={section.id}>
          <polygon
            points={pointsString}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <text
            x={centerX}
            y={centerY}
            fontSize="12"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            {section.name}
          </text>
        </g>
      )
    }

    // 사각형 배치
    if (isRectangleSection(section)) {
      return (
        <g key={section.id}>
          <rect
            x={section.x}
            y={section.y}
            width={section.width}
            height={section.height}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            rx={4}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <text
            x={section.x + section.width / 2}
            y={section.y + section.height / 2}
            fontSize="14"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            {section.name}
          </text>
          {section.capacity && (
            <text
              x={section.x + section.width / 2}
              y={section.y + section.height / 2 + 20}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
              className="pointer-events-none"
            >
              ({section.capacity}명)
            </text>
          )}
        </g>
      )
    }

    // 원형 배치
    if (isCircleSection(section)) {
      return (
        <g key={section.id}>
          <circle
            cx={section.centerX}
            cy={section.centerY}
            r={section.radius}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <text
            x={section.centerX}
            y={section.centerY}
            fontSize="14"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            {section.name}
          </text>
        </g>
      )
    }

    // 원형/부채꼴 좌석 배치
    if (isCircularSection(section)) {
      const { centerX, centerY, startAngle, endAngle, innerRadius, outerRadius } = section

      // 부채꼴 path 생성
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      const x1 = centerX + innerRadius * Math.cos(startRad)
      const y1 = centerY + innerRadius * Math.sin(startRad)
      const x2 = centerX + outerRadius * Math.cos(startRad)
      const y2 = centerY + outerRadius * Math.sin(startRad)
      const x3 = centerX + outerRadius * Math.cos(endRad)
      const y3 = centerY + outerRadius * Math.sin(endRad)
      const x4 = centerX + innerRadius * Math.cos(endRad)
      const y4 = centerY + innerRadius * Math.sin(endRad)

      const largeArc = endAngle - startAngle > 180 ? 1 : 0

      const pathData = `
        M ${x1} ${y1}
        L ${x2} ${y2}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
        L ${x4} ${y4}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
        Z
      `

      // 라벨 위치 (중앙)
      const midAngle = (startAngle + endAngle) / 2
      const midRadius = (innerRadius + outerRadius) / 2
      const labelX = centerX + midRadius * Math.cos((midAngle * Math.PI) / 180)
      const labelY = centerY + midRadius * Math.sin((midAngle * Math.PI) / 180)

      return (
        <g key={section.id}>
          <path
            d={pathData}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <text
            x={labelX}
            y={labelY}
            fontSize="12"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            {section.name}
          </text>
        </g>
      )
    }

    // 그리드 좌석 배치
    if (isGridSection(section)) {
      return (
        <g key={section.id}>
          <rect
            x={section.x}
            y={section.y}
            width={section.width}
            height={section.height}
            fill={getSectionColor(section)}
            fillOpacity={getSectionOpacity(section)}
            stroke={isSelected || isHovered ? "#000" : section.color}
            strokeWidth={isSelected ? 2 : 1}
            className={isClickable ? "cursor-pointer transition-all" : ""}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <text
            x={section.x + section.width / 2}
            y={section.y + section.height / 2}
            fontSize="12"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            {section.name}
          </text>
        </g>
      )
    }

    return null
  }

  return (
    <div className={`w-full bg-white rounded-lg border overflow-hidden ${className}`}>
      <svg viewBox={layout.viewBox} className="w-full h-auto p-7" style={{ maxHeight: "600px" }}>
        {/* 모든 섹션 렌더링 */}
        {layout.sections.map((section) => renderSection(section))}
      </svg>
    </div>
  )
}
