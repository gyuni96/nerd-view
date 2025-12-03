"use client"

import { useParams, useRouter } from "next/navigation"
import SectionDetailView from "@/app/venues/[id]/sections/[sectionId]/_components/SectionDetailView"
import { useSectionDetail } from "../_hooks/useSectionDetail"

const dumpData = {
  aisleWidth: 25,
  name: "Floor 1",
  sectionId: "",
  rowDefinitions: [
    {
      rowLabel: "1",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 340 },
      seatSpacing: 16,
      aisleAfter: [], // 10번 좌석 뒤에 통로
    },
    {
      rowLabel: "2",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 355 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "3",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 370 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "4",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 385 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "5",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 400 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "6",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 415 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "7",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 430 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "8",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 445 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "9",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 460 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "10",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 475 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "11",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 490 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "12",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 505 },
      seatSpacing: 16,
      aisleAfter: [],
    },
    {
      rowLabel: "13",
      startSeatNum: 1,
      seatCount: 22,
      startPosition: { x: 70, y: 520 },
      seatSpacing: 16,
      aisleAfter: [],
    },
  ],
}

export default function SectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const sectionId = params.sectionId as string

  // Hook을 사용하여 모든 로직 처리
  const {
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
  } = useSectionDetail(dumpData)

  return (
    <SectionDetailView
      sectionName={dumpData.name}
      seats={seats}
      hoveredSeat={hoveredSeat}
      selectedSeatForView={selectedSeatForView}
      viewBox={viewBox}
      rowDefinitions={dumpData.rowDefinitions}
      onSeatClick={handleSeatClick}
      onCloseModal={handleCloseModal}
      onSeatHover={setHoveredSeat}
      getSeatColor={getSeatColor}
      getSeatStroke={getSeatStroke}
      getSeatSize={getSeatSize}
      onBack={() => router.back()}
    />
  )
}
