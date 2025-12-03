"use client"

import { SeatInfo, RowDefinition } from "@/types/seat-layout"
import SeatViewModal from "../../../../../../components/venue/SeatViewModal"

interface SectionDetailViewProps {
  sectionName: string
  seats: SeatInfo[]
  hoveredSeat: SeatInfo | null
  selectedSeatForView: SeatInfo | null
  viewBox: string
  rowDefinitions: RowDefinition[]
  onSeatClick: (seat: SeatInfo) => void
  onCloseModal: () => void
  onSeatHover: (seat: SeatInfo | null) => void
  getSeatColor: (isHovered: boolean) => string
  getSeatStroke: (isHovered: boolean) => string
  getSeatSize: (isHovered: boolean) => { size: number; offset: number }
  onBack: () => void
}

export default function SectionDetailView({
  sectionName,
  seats,
  hoveredSeat,
  selectedSeatForView,
  viewBox,
  rowDefinitions,
  onSeatClick,
  onCloseModal,
  onSeatHover,
  getSeatColor,
  getSeatStroke,
  getSeatSize,
  onBack,
}: SectionDetailViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{sectionName} 상세 좌석</h2>
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-4 py-2 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="font-semibold text-blue-800 mb-1">사용 방법</div>
                <p className="text-sm text-blue-700">
                  좌석을 클릭하면 해당 좌석에서 보이는 무대 뷰를 확인할 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <svg viewBox={viewBox} className="w-full h-[600px] border border-gray-300 bg-gray-50">
            {/* 좌석 렌더링 */}
            {seats.map((seat) => {
              const isHovered =
                hoveredSeat?.seatNumber === seat.seatNumber &&
                hoveredSeat?.rowLabel === seat.rowLabel

              const { size: seatSize, offset } = getSeatSize(isHovered)

              return (
                <g key={`${seat.rowLabel}-${seat.seatNumber}`}>
                  {/* 좌석 */}
                  <rect
                    x={seat.position.x + offset}
                    y={seat.position.y + offset}
                    width={seatSize}
                    height={seatSize}
                    rx="2"
                    ry="2"
                    fill={getSeatColor(isHovered)}
                    stroke={getSeatStroke(isHovered)}
                    strokeWidth={isHovered ? 1.5 : 0.5}
                    className="cursor-pointer transition-all duration-150"
                    onClick={() => onSeatClick(seat)}
                    onMouseEnter={() => onSeatHover(seat)}
                    onMouseLeave={() => onSeatHover(null)}
                  />
                </g>
              )
            })}

            {/* 행 라벨 */}
            {rowDefinitions.map((row) => (
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
            ))}
          </svg>

          {/* 호버된 좌석 정보 */}
          {hoveredSeat && (
            <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700">
              <div className="text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                {hoveredSeat.rowLabel}행 {hoveredSeat.seatNumber}번
              </div>
              <div className="text-xs text-gray-300 mt-1.5">{sectionName}</div>
              <div className="text-xs text-blue-300 mt-1.5 font-medium">클릭하여 좌석 뷰 확인</div>
            </div>
          )}
        </div>
      </div>

      {/* 좌석 뷰 모달 */}
      {selectedSeatForView && (
        <SeatViewModal
          seat={selectedSeatForView}
          sectionName={sectionName}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}
