"use client"

import { useState } from "react"
import { Section, SeatInfo, RowDefinition } from "@/types/seat-layout"

interface SeatLayoutDetailProps {
  section: Section
  onClose?: () => void
  onSeatSelect?: (seat: SeatInfo) => void
  selectedSeats?: SeatInfo[]
}

export default function SeatLayoutDetail({
  section,
  onClose,
  onSeatSelect,
  selectedSeats = [],
}: SeatLayoutDetailProps) {
  const [hoveredSeat, setHoveredSeat] = useState<SeatInfo | null>(null)

  // 좌석 정보 생성
  const generateSeats = (): SeatInfo[] => {
    const seats: SeatInfo[] = []

    section.seatLayout.forEach((layout) => {
      layout.rowDefinitions.forEach((row: RowDefinition) => {
        let currentX = row.startPosition.x

        for (let i = 0; i < row.seatCount; i++) {
          const seatNumber = row.startSeatNum + i
          const seatPosition = {
            x: currentX,
            y: row.startPosition.y,
          }

          seats.push({
            sectionId: section.id,
            rowLabel: row.rowLabel,
            seatNumber,
            position: seatPosition,
          })

          // 다음 좌석 위치 계산 (통로가 있으면 추가 간격)
          currentX += row.seatSpacing
          if (row.aisleAfter.includes(seatNumber)) {
            currentX += layout.aisleWidth // 통로 간격 추가
          }
        }
      })
    })

    return seats
  }

  const seats = generateSeats()

  const isSeatSelected = (seat: SeatInfo) => {
    return selectedSeats.some(
      (s) =>
        s.sectionId === seat.sectionId &&
        s.rowLabel === seat.rowLabel &&
        s.seatNumber === seat.seatNumber
    )
  }

  const handleSeatClick = (seat: SeatInfo) => {
    onSeatSelect?.(seat)
  }

  // SVG 뷰박스 계산
  const calculateViewBox = () => {
    if (seats.length === 0) return "0 0 1000 1000"

    const xCoords = seats.map((s) => s.position.x)
    const yCoords = seats.map((s) => s.position.y)

    const minX = Math.min(...xCoords) - 50
    const maxX = Math.max(...xCoords) + 50
    const minY = Math.min(...yCoords) - 50
    const maxY = Math.max(...yCoords) + 50

    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{section.name} 상세 좌석</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-4 bg-blue-600 rounded border border-blue-700"></div>
              <span>선택됨</span>
            </div>
            {section.name.includes("VIP") && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 bg-purple-600 rounded border border-purple-700"></div>
                <span>VIP석</span>
              </div>
            )}
            {section.name.includes("발코니") && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 bg-red-600 rounded border border-red-700"></div>
                <span>발코니석</span>
              </div>
            )}
            {section.name.includes("스탠딩") && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 bg-orange-600 rounded border border-orange-700"></div>
                <span>스탠딩</span>
              </div>
            )}
            {!section.name.includes("VIP") &&
              !section.name.includes("발코니") &&
              !section.name.includes("스탠딩") && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-4 bg-green-600 rounded border border-green-700"></div>
                  <span>일반석</span>
                </div>
              )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-300"></div>
              <span>통로 (간격)</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <svg
            viewBox={calculateViewBox()}
            className="w-full h-[600px] border border-gray-300 bg-gray-50"
          >
            {/* 좌석 렌더링 */}
            {seats.map((seat) => {
              const isSelected = isSeatSelected(seat)
              const isHovered =
                hoveredSeat?.seatNumber === seat.seatNumber &&
                hoveredSeat?.rowLabel === seat.rowLabel

              // 좌석 등급별 색상 설정
              const getSeatColor = () => {
                if (isSelected) return "#2563eb" // 선택된 좌석 - 파란색
                if (isHovered) return "#3b82f6" // 호버된 좌석 - 밝은 파란색

                // 섹션별 색상 구분
                if (section.name.includes("VIP")) return "#7c3aed" // VIP - 보라색
                if (section.name.includes("발코니")) return "#dc2626" // 발코니 - 빨간색
                if (section.name.includes("스탠딩")) return "#ea580c" // 스탠딩 - 주황색
                return "#059669" // 일반석 - 초록색
              }

              const getSeatStroke = () => {
                if (isSelected) return "#1d4ed8"
                if (isHovered) return "#2563eb"

                if (section.name.includes("VIP")) return "#6b21a8"
                if (section.name.includes("발코니")) return "#b91c1c"
                if (section.name.includes("스탠딩")) return "#c2410c"
                return "#047857"
              }

              return (
                <g key={`${seat.rowLabel}-${seat.seatNumber}`}>
                  {/* 좌석 */}
                  <rect
                    x={seat.position.x - 5}
                    y={seat.position.y - 5}
                    width="10"
                    height="10"
                    rx="2"
                    ry="2"
                    fill={getSeatColor()}
                    stroke={getSeatStroke()}
                    strokeWidth={isHovered || isSelected ? 1 : 0.5}
                    className="cursor-pointer transition-all duration-200 hover:opacity-80 filter drop-shadow-sm"
                    onClick={() => handleSeatClick(seat)}
                    onMouseEnter={() => setHoveredSeat(seat)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  />

                  {/* 좌석 번호 */}
                  <text
                    x={seat.position.x}
                    y={seat.position.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-xs font-bold pointer-events-none select-none"
                    style={{ fontSize: "6px" }}
                  >
                    {seat.seatNumber}
                  </text>
                </g>
              )
            })}

            {/* 행 라벨 */}
            {section.seatLayout.map((layout) =>
              layout.rowDefinitions.map((row) => (
                <text
                  key={row.rowLabel}
                  x={row.startPosition.x - 25}
                  y={row.startPosition.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-600 font-medium pointer-events-none select-none"
                  style={{ fontSize: "8px" }}
                >
                  {row.rowLabel}
                </text>
              ))
            )}
          </svg>

          {/* 호버된 좌석 정보 */}
          {hoveredSeat && (
            <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-90 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
              <div className="text-sm font-medium">
                🪑 {hoveredSeat.rowLabel}행 {hoveredSeat.seatNumber}번
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {section.name} • {section.seatLayout[0]?.type}
              </div>
            </div>
          )}
        </div>

        {/* 선택된 좌석 정보 */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
              🎫 선택된 좌석 ({selectedSeats.length}개)
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={`${seat.rowLabel}-${seat.seatNumber}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm"
                >
                  {seat.rowLabel}행 {seat.seatNumber}번
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-blue-700">
              💡 좌석을 다시 클릭하면 선택이 해제됩니다
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
