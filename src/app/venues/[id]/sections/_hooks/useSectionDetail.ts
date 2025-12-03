"use client"

import { useState, useMemo, useCallback } from "react"
import { SeatInfo, RowDefinition } from "@/types/seat-layout"

interface DumpData {
  aisleWidth: number
  name: string
  sectionId: string
  rowDefinitions: RowDefinition[]
}

interface UseSectionDetailReturn {
  seats: SeatInfo[]
  hoveredSeat: SeatInfo | null
  selectedSeatForView: SeatInfo | null
  viewBox: string
  handleSeatClick: (seat: SeatInfo) => void
  handleCloseModal: () => void
  setHoveredSeat: (seat: SeatInfo | null) => void
  getSeatColor: (isHovered: boolean) => string
  getSeatStroke: (isHovered: boolean) => string
  getSeatSize: (isHovered: boolean) => { size: number; offset: number }
}

export const useSectionDetail = (dumpData: DumpData): UseSectionDetailReturn => {
  const [hoveredSeat, setHoveredSeat] = useState<SeatInfo | null>(null)
  const [selectedSeatForView, setSelectedSeatForView] = useState<SeatInfo | null>(null)

  // 좌석 정보 생성 (Memoized)
  const seats = useMemo((): SeatInfo[] => {
    const generatedSeats: SeatInfo[] = []

    dumpData.rowDefinitions.forEach((row: RowDefinition) => {
      let currentX = row.startPosition.x

      for (let i = 0; i < row.seatCount; i++) {
        const seatNumber = row.startSeatNum + i
        const seatPosition = {
          x: currentX,
          y: row.startPosition.y,
        }

        generatedSeats.push({
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

    return generatedSeats
  }, [dumpData.rowDefinitions, dumpData.sectionId, dumpData.aisleWidth])

  // SVG 뷰박스 계산 (Memoized)
  const viewBox = useMemo(() => {
    if (seats.length === 0) return "0 0 1000 1000"

    const xCoords = seats.map((s) => s.position.x)
    const yCoords = seats.map((s) => s.position.y)

    const minX = Math.min(...xCoords) - 50
    const maxX = Math.max(...xCoords) + 50
    const minY = Math.min(...yCoords) - 50
    const maxY = Math.max(...yCoords) + 50

    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
  }, [seats])

  // 좌석 클릭 핸들러
  const handleSeatClick = useCallback((seat: SeatInfo) => {
    setSelectedSeatForView(seat)
  }, [])

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setSelectedSeatForView(null)
  }, [])

  // 좌석 색상 계산
  const getSeatColor = useCallback((isHovered: boolean): string => {
    if (isHovered) return "#3b82f6" // 호버된 좌석 - 밝은 파란색
    return "#9ca3af" // 회색
  }, [])

  // 좌석 테두리 색상 계산
  const getSeatStroke = useCallback((isHovered: boolean): string => {
    if (isHovered) return "#2563eb"
    return "#6b7280" // 진한 회색
  }, [])

  // 좌석 크기 계산
  const getSeatSize = useCallback(
    (isHovered: boolean): { size: number; offset: number } => {
      const seatSize = isHovered ? 12 : 10
      const offset = isHovered ? -6 : -5
      return { size: seatSize, offset }
    },
    []
  )

  return {
    seats,
    hoveredSeat,
    selectedSeatForView,
    viewBox,
    handleSeatClick,
    handleCloseModal,
    setHoveredSeat,
    getSeatColor,
    getSeatStroke,
    getSeatSize,
  }
}
