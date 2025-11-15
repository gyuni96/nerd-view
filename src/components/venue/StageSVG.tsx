"use client"

import { Stage } from "@/types/seat-layout"

interface StageSVGProps {
  stage: Stage
  className?: string
}

export default function StageSVG({ stage, className = "" }: StageSVGProps) {
  return (
    <g className={`stage-svg ${className}`}>
      {/* 무대 그라데이션 정의 */}
      <defs>
        <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#374151", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#4b5563", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1f2937", stopOpacity: 1 }} />
        </linearGradient>
        <filter id="stageShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* 무대 배경 */}
      <path
        d={stage.d}
        fill="url(#stageGradient)"
        stroke="#1f2937"
        strokeWidth="2"
        filter="url(#stageShadow)"
        className="drop-shadow-lg"
      />

      {/* 무대 테두리 장식 */}
      <path d={stage.d} fill="none" stroke="#f59e0b" strokeWidth="1" className="opacity-60" />

      {/* 무대 텍스트 */}
      <text
        x={stage.x + 125} // 무대 중앙 계산
        y={stage.y + 45} // 무대 중앙 계산
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white text-xl font-bold"
        style={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        STAGE
      </text>
    </g>
  )
}
