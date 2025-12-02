"use client"

import { VenueSections } from "@/lib/schemas/venues"
import { calculateTextPosition, darkenColor } from "@/lib/utils"
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
