"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Section, SeatInfo, RowDefinition } from "@/types/seat-layout"
import { sampleVenueData } from "@/data/sample-venue"
import SeatViewModal from "@/components/venue/SeatViewModal"

const dumpData = {
  type: "일반좌석",
  aisleWidth: 25,
  name: "Floor 1",
  sectionId: "",
  rowDefinitions: [
    {
      rowLabel: "A",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 340 },
      seatSpacing: 18,
      aisleAfter: [10], // 10번 좌석 뒤에 통로
    },
    {
      rowLabel: "B",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 355 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "C",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 370 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "D",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 385 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "E",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 400 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "F",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 415 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "G",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 430 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "H",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 445 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "I",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 460 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
    {
      rowLabel: "J",
      startSeatNum: 1,
      seatCount: 20,
      startPosition: { x: 70, y: 475 },
      seatSpacing: 18,
      aisleAfter: [10],
    },
  ],
}

export default function SectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const sectionId = params.sectionId as string

  const [hoveredSeat, setHoveredSeat] = useState<SeatInfo | null>(null)
  const [selectedSeatForView, setSelectedSeatForView] = useState<SeatInfo | null>(null)

  // // 섹션 찾기
  // const section = sampleVenueData.section.find((s) => s.id === sectionId)

  // if (!section) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-red-600">섹션을 찾을 수 없습니다</h2>
  //         <button
  //           onClick={() => router.back()}
  //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //         >
  //           돌아가기
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  // 좌석 정보 생성
  const generateSeats = (): SeatInfo[] => {
    const seats: SeatInfo[] = []

    dumpData.rowDefinitions.forEach((row: RowDefinition) => {
      let currentX = row.startPosition.x

      for (let i = 0; i < row.seatCount; i++) {
        const seatNumber = row.startSeatNum + i
        const seatPosition = {
          x: currentX,
          y: row.startPosition.y,
        }

        seats.push({
          sectionId: dumpData.sectionId,
          rowLabel: row.rowLabel,
          seatNumber,
          position: seatPosition,
        })

        // 다음 좌석 위치 계산 (통로가 있으면 추가 간격)
        currentX += row.seatSpacing
        if (row.aisleAfter.includes(seatNumber)) {
          currentX += dumpData.aisleWidth // 통로 간격 추가
        }
      }
    })

    return seats
  }

  const seats = generateSeats()

  const handleSeatClick = (seat: SeatInfo) => {
    setSelectedSeatForView(seat)
  }

  const handleCloseModal = () => {
    setSelectedSeatForView(null)
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
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{dumpData.name} 상세 좌석</h2>
          <button
            onClick={() => router.back()}
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
          <svg
            viewBox={calculateViewBox()}
            className="w-full h-[600px] border border-gray-300 bg-gray-50"
          >
            {/* 좌석 렌더링 */}
            {seats.map((seat) => {
              const isHovered =
                hoveredSeat?.seatNumber === seat.seatNumber &&
                hoveredSeat?.rowLabel === seat.rowLabel

              // 좌석 등급별 색상 설정
              const getSeatColor = () => {
                if (isHovered) return "#3b82f6" // 호버된 좌석 - 밝은 파란색

                // 섹션별 색상 구분
                if (dumpData.name.includes("VIP")) return "#7c3aed" // VIP - 보라색
                if (dumpData.name.includes("발코니")) return "#dc2626" // 발코니 - 빨간색
                if (dumpData.name.includes("스탠딩")) return "#ea580c" // 스탠딩 - 주황색
                return "#059669" // 일반석 - 초록색
              }

              const getSeatStroke = () => {
                if (isHovered) return "#2563eb"

                if (dumpData.name.includes("VIP")) return "#6b21a8"
                if (dumpData.name.includes("발코니")) return "#b91c1c"
                if (dumpData.name.includes("스탠딩")) return "#c2410c"
                return "#047857"
              }

              const seatSize = isHovered ? 12 : 10
              const offset = isHovered ? -6 : -5

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
                    fill={getSeatColor()}
                    stroke={getSeatStroke()}
                    strokeWidth={isHovered ? 1.5 : 0.5}
                    className="cursor-pointer transition-all duration-150"
                    style={{
                      filter: isHovered ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" : "none",
                    }}
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
                    className="fill-white font-bold pointer-events-none select-none"
                    style={{ fontSize: isHovered ? "7px" : "6px" }}
                  >
                    {seat.seatNumber}
                  </text>
                </g>
              )
            })}

            {/* 행 라벨 */}
            {dumpData.rowDefinitions.map((row) => (
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
              <div className="text-xs text-gray-300 mt-1.5">
                {dumpData.name} • {dumpData?.type}
              </div>
              <div className="text-xs text-blue-300 mt-1.5 font-medium">클릭하여 좌석 뷰 확인</div>
            </div>
          )}
        </div>
      </div>

      {/* 좌석 뷰 모달 */}
      {selectedSeatForView && (
        <SeatViewModal
          seat={selectedSeatForView}
          sectionName={dumpData.name}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
