"use client"

import { VenueSections } from "@/lib/schemas/venues"
import { Stage } from "@/types/seat-layout"

interface StageSVGProps {
  stage: VenueSections
  className?: string
}

export const StageSVG = ({ stage, className = "" }: StageSVGProps) => {
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

    if (points.length === 0) return { x: 0, y: 0, width: 0, height: 0 }

    const xs = points.map((p) => p.x)
    const ys = points.map((p) => p.y)

    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2 + 0.5, // 아주 조금만 아래로 조정
      width: maxX - minX,
      height: maxY - minY,
    }
  }

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
