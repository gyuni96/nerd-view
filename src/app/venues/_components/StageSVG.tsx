"use client"

import { VenueSections } from "@/lib/schemas/venues"
import { calculateTextPosition } from "@/lib/utils"
import { Stage } from "@/types/seat-layout"

interface StageSVGProps {
  stage: VenueSections
  className?: string
}

export const StageSVG = ({ stage, className = "" }: StageSVGProps) => {
  const textPos = calculateTextPosition(stage.d)

  // Stage 크기에 따라 동적으로 폰트 크기 계산
  const fontSize = Math.min(textPos.width / 8, textPos.height / 2, 16)

  return (
    <g className={`stage-svg ${className}`}>
      {/* 무대 그라데이션 정의 */}
      <defs>
        <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#374151", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#4b5563", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1f2937", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* 무대 배경 */}
      <path
        d={stage.d}
        fill="url(#stageGradient)"
        filter="url(#stageShadow)"
        className="drop-shadow-lg"
      />

      {/* 무대 텍스트 */}
      <text
        x={textPos.x}
        y={textPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white font-bold pointer-events-none select-none"
        style={{
          fontSize: `${fontSize}px`,
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        STAGE
      </text>
    </g>
  )
}

export default StageSVG
