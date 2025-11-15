"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation" //
import { Button } from "../ui/button"

const Header = () => {
  const router = useRouter()

  const onBack = () => {
    router.back()
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="truncate text-base sm:text-xl">{/*venue.name*/ "콘서트장 이름"}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {/*venue.location*/ "서울특별시 강남구 삼성동 123-45"}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const data = {
  section: [
    {
      id: "uuid", // 문자열
      name: "name", // 문자열
      d: "svg path data", // 문자열 (SVG path data)
      seatLayout: [
        {
          type: "좌석배치타입", // 문자열
          aisleWidth: "통로너비", // 숫자
          rowDefinitions: [
            {
              rowLabel: "행번호", // 문자열
              startSeatNum: "해닫 행의 시작좌석번호", // 숫자
              seatCount: "해당 행의 좌석갯수", // 숫자
              startPosition: { x: "시작좌표 x", y: "시작좌표 y" }, // 객체 { x: 숫자, y: 숫자 }
              seatSpacing: "좌석간격", // 숫자
              aisleAfter: ["통로가 위치할 좌석 번호"], // 숫자 배열 : 예 [9] 9번 좌석 뒤에 통로
            },
          ],
        },
      ],
    },
  ],
}
