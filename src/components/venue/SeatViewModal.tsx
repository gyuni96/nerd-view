"use client"

import { SeatInfo } from "@/types/seat-layout"
import Image from "next/image"

interface SeatViewModalProps {
  seat: SeatInfo
  sectionName: string
  onClose: () => void
}

export default function SeatViewModal({ seat, sectionName, onClose }: SeatViewModalProps) {
  // 좌석 등급에 따른 뷰 설명
  const getViewDescription = () => {
    if (sectionName.includes("VIP")) {
      return "무대와 가장 가까운 프리미엄 좌석으로, 공연자의 표정과 디테일한 연출을 선명하게 감상하실 수 있습니다."
    } else if (sectionName.includes("발코니")) {
      return "무대 전체를 조망할 수 있는 발코니 좌석으로, 공연의 전체적인 구성과 연출을 한눈에 감상하실 수 있습니다."
    } else if (sectionName.includes("스탠딩")) {
      return "무대와 가까운 스탠딩 구역으로, 역동적인 분위기 속에서 공연을 즐기실 수 있습니다."
    } else {
      return "무대를 정면에서 감상할 수 있는 일반석으로, 균형잡힌 시야에서 공연을 편안하게 관람하실 수 있습니다."
    }
  }

  // 좌석 등급별 색상
  const getGradeColor = () => {
    if (sectionName.includes("VIP")) return "bg-purple-100 text-purple-800 border-purple-300"
    if (sectionName.includes("발코니")) return "bg-red-100 text-red-800 border-red-300"
    if (sectionName.includes("스탠딩")) return "bg-orange-100 text-orange-800 border-orange-300"
    return "bg-green-100 text-green-800 border-green-300"
  }

  // 좌석별 뷰 이미지 (실제로는 서버에서 제공되어야 함)
  const getViewImageUrl = () => {
    // 실제 구현에서는 seat 정보를 기반으로 실제 이미지 URL을 반환
    // 현재는 플레이스홀더 이미지 사용
    if (sectionName.includes("VIP")) {
      return "https://placehold.co/800x600/7c3aed/white?text=VIP+Seat+View"
    } else if (sectionName.includes("발코니")) {
      return "https://placehold.co/800x600/dc2626/white?text=Balcony+View"
    } else if (sectionName.includes("스탠딩")) {
      return "https://placehold.co/800x600/ea580c/white?text=Standing+Area+View"
    } else {
      return "https://placehold.co/800x600/059669/white?text=General+Seat+View"
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">좌석 뷰 미리보기</h2>
            <p className="text-sm text-gray-500 mt-1">
              {sectionName} • {seat.rowLabel}행 {seat.seatNumber}번
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          {/* 좌석 등급 배지 */}
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getGradeColor()}`}>
              {sectionName.includes("VIP") && "🌟 VIP석"}
              {sectionName.includes("발코니") && "🎭 발코니석"}
              {sectionName.includes("스탠딩") && "🎸 스탠딩"}
              {!sectionName.includes("VIP") && !sectionName.includes("발코니") && !sectionName.includes("스탠딩") && "🎫 일반석"}
            </span>
          </div>

          {/* 뷰 이미지 */}
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
            <Image
              src={getViewImageUrl()}
              alt={`${seat.rowLabel}행 ${seat.seatNumber}번 좌석 뷰`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* 좌석 정보 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg text-blue-900 mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              이 좌석에서의 시야
            </h3>
            <p className="text-gray-700 leading-relaxed">{getViewDescription()}</p>
          </div>

          {/* 좌석 상세 정보 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">구역</div>
              <div className="font-semibold text-gray-900">{sectionName}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">좌석 위치</div>
              <div className="font-semibold text-gray-900">
                {seat.rowLabel}행 {seat.seatNumber}번
              </div>
            </div>
          </div>

          {/* 안내사항 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
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
                <div className="font-semibold text-yellow-800 mb-1">안내사항</div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 실제 공연 시 조명과 무대 연출에 따라 시야가 다를 수 있습니다</li>
                  <li>• 이미지는 참고용이며, 실제 좌석에서의 뷰와 차이가 있을 수 있습니다</li>
                  <li>• 앞 좌석 관람객의 키나 자세에 따라 시야가 일부 가려질 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
