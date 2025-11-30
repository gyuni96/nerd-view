"use client"

import { VenueSections } from "@/lib/schemas/venues"
import { darkenColor } from "@/lib/utils"
import { Section } from "@/types/seat-layout"

interface SectionSVGProps {
  section: VenueSections
  onClick?: (sectionId: string) => void
  className?: string
}

export default function SectionSVG({ section, onClick, className = "" }: SectionSVGProps) {
  const handleClick = () => {
    onClick?.(section?.id)
  }

  // SVG path에서 실제 경계 상자(bounding box)의 정확한 중심점 계산
  const calculateTextPosition = (pathData?: string) => {
    const commands = pathData?.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || []

    const points: { x: number; y: number }[] = []
    let currentX = 0
    let currentY = 0

    commands.forEach((cmd) => {
      const type = cmd[0].toUpperCase()
      const coords =
        cmd
          .slice(1)
          .trim()
          .match(/-?[\d.]+/g)
          ?.map(Number) || []

      switch (type) {
        case "M": // Move to
        case "L": // Line to
          if (coords.length >= 2) {
            currentX = coords[coords.length - 2]
            currentY = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
        case "H": // Horizontal line
          if (coords.length >= 1) {
            currentX = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
        case "V": // Vertical line
          if (coords.length >= 1) {
            currentY = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
        case "C": // Cubic Bezier curve
          // 제어점 2개를 건너뛰고 끝점만 사용
          if (coords.length >= 6) {
            currentX = coords[coords.length - 2]
            currentY = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
        case "S": // Smooth cubic Bezier
        case "Q": // Quadratic Bezier
          if (coords.length >= 4) {
            currentX = coords[coords.length - 2]
            currentY = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
        case "T": // Smooth quadratic Bezier
          if (coords.length >= 2) {
            currentX = coords[coords.length - 2]
            currentY = coords[coords.length - 1]
            points.push({ x: currentX, y: currentY })
          }
          break
      }
    })

    if (points.length === 0) return { x: 0, y: 0 }

    // 실제 끝점들만으로 bounding box 계산
    const xs = points.map((p) => p.x)
    const ys = points.map((p) => p.y)

    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
    }
  }

  const textPos = calculateTextPosition(section.d)

  return (
    <g className={`cursor-pointer transition-all duration-200 ${className}`} onClick={handleClick}>
      <path
        d={section.d}
        fill={section.color || "#e5e7eb"}
        stroke={darkenColor(section.color || "#9ca3af")}
        strokeWidth={1}
        className="hover:fill-blue-200 hover:stroke-blue-400"
      />
      <text
        x={textPos.x}
        y={textPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-700 text-[8px] font-bold pointer-events-none select-none"
      >
        {section.name}
      </text>
    </g>
  )
}
