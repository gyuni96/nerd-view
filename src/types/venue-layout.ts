/**
 * 공연장 좌석 배치도 타입 정의
 * 원형(아레나), 사각형(극장), 반원형 등 다양한 형태 지원
 */

export type SeatStatus = "available" | "sold" | "selected" | "disabled"

export type SectionType = "standing" | "seated" | "stage" | "vip" | "disabled"

// ========== 좌석 정보 ==========
export type Seat = {
  id: string
  number: string
  row: string
  status: SeatStatus
}

// ========== 섹션 배치 방식 ==========

/** 원형 배치 (아레나형 공연장) - 무대를 중심으로 원형/부채꼴 배치 */
export type CircularSection = {
  id: string
  name: string
  type: SectionType
  layout: "circular"

  // 원형 배치 정보
  centerX: number // 중심점 X
  centerY: number // 중심점 Y
  startAngle: number // 시작 각도 (0-360도)
  endAngle: number // 끝 각도
  innerRadius: number // 안쪽 반지름
  outerRadius: number // 바깥쪽 반지름

  // 좌석 정보
  rows?: number // 행 개수
  seatsPerRow?: number // 행당 좌석 개수
  seats?: Seat[] // 개별 좌석 데이터 (선택적)

  // 스타일
  color: string
  capacity?: number
}

/** 그리드 배치 (사각형 극장형) - 전통적인 행/열 배치 */
export type GridSection = {
  id: string
  name: string
  type: SectionType
  layout: "grid"

  // 그리드 배치 정보
  x: number // 시작 X 좌표
  y: number // 시작 Y 좌표
  width: number // 전체 너비
  height: number // 전체 높이

  // 좌석 정보
  rows: number // 행 개수
  seatsPerRow: number // 행당 좌석 개수
  rowCurve?: number // 행의 곡선 정도 (0=직선, 양수=앞으로 휨)
  seats?: Seat[] // 개별 좌석 데이터 (선택적)

  // 스타일
  color: string
  capacity?: number
}

/** 다각형 배치 (스탠딩, 무대 등 불규칙한 형태) */
export type PolygonSection = {
  id: string
  name: string
  type: SectionType
  layout: "polygon"

  // 다각형 점 좌표
  points: [number, number][]

  // 스타일
  color: string
  capacity?: number

  // 텍스트 표시 위치 (선택적)
  labelX?: number
  labelY?: number
}

/** 사각형 배치 (단순 사각형 영역) */
export type RectangleSection = {
  id: string
  name: string
  type: SectionType
  layout: "rectangle"

  x: number
  y: number
  width: number
  height: number

  color: string
  capacity?: number
}

/** 원형 배치 (원 모양 영역) */
export type CircleSection = {
  id: string
  name: string
  type: SectionType
  layout: "circle"

  centerX: number
  centerY: number
  radius: number

  color: string
  capacity?: number
}

/** SVG Path 배치 (복잡한 형태의 좌석 구역) */
export type PathSection = {
  id: string
  name: string
  type: SectionType
  layout: "path"

  // SVG path 데이터
  pathData: string // SVG의 d 속성값

  // 스타일
  color: string
  capacity?: number

  // 텍스트 표시 위치 (선택적)
  labelX?: number
  labelY?: number
}

// 모든 섹션 타입 유니온
export type Section =
  | CircularSection
  | GridSection
  | PolygonSection
  | RectangleSection
  | CircleSection
  | PathSection

// ========== 공연장 레이아웃 ==========
export type VenueLayoutType = "arena" | "theater" | "stadium" | "hall"

export type VenueLayout = {
  id: string
  venueId: string
  name: string
  type: VenueLayoutType
  viewBox: string // SVG viewBox (예: "0 0 1000 1000")

  sections: Section[]

  // 메타 정보
  totalCapacity?: number
  createdAt?: string
  updatedAt?: string
}

// ========== 헬퍼 타입 가드 ==========
export function isCircularSection(section: Section): section is CircularSection {
  return section.layout === "circular"
}

export function isGridSection(section: Section): section is GridSection {
  return section.layout === "grid"
}

export function isPolygonSection(section: Section): section is PolygonSection {
  return section.layout === "polygon"
}

export function isRectangleSection(section: Section): section is RectangleSection {
  return section.layout === "rectangle"
}

export function isCircleSection(section: Section): section is CircleSection {
  return section.layout === "circle"
}

export function isPathSection(section: Section): section is PathSection {
  return section.layout === "path"
}
