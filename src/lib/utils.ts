import { TransformedVenueData } from "@/app/venues/_hooks/useVenues"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * HEX 색상을 어둡게 만드는 함수
 * @param hex - HEX 색상 코드 (예: "#FFC1C3" 또는 "FFC1C3")
 * @param percent - 어둡게 할 비율 (0~100, 기본값 20)
 * @returns 어두워진 HEX 색상 코드
 */
export const darkenColor = (hex: string, percent: number = 20): string => {
  // # 제거
  hex = hex.replace(/^#/, "")

  // RGB 값 추출
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // 어둡게 만들기 (percent만큼 감소)
  const factor = 1 - percent / 100
  const newR = Math.round(r * factor)
  const newG = Math.round(g * factor)
  const newB = Math.round(b * factor)

  // HEX로 변환
  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}

/////////// SVG 관련 유틸 함수 ///////////

/**
 * Path 데이터에서 좌표 추출
 * @param pathData
 * @returns
 */
export const getPathBounds = (pathData: string) => {
  const numbers = pathData.match(/[\d.]+/g)?.map(Number) || []
  const coords: number[] = []

  for (let i = 0; i < numbers.length; i += 2) {
    if (i + 1 < numbers.length) {
      coords.push(numbers[i], numbers[i + 1])
    }
  }

  if (coords.length === 0) return { minX: 0, minY: 0, maxX: 100, maxY: 100 }

  const xs = coords.filter((_, i) => i % 2 === 0)
  const ys = coords.filter((_, i) => i % 2 === 1)

  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  }
}

/**
 * 공연장 전체 뷰박스 계산
 * @param venueData
 * @returns
 */
export const calculateViewBox = (venueData: TransformedVenueData) => {
  if (venueData?.section.length === 0) return "0 0 850 800"

  let minX = Infinity,
    minY = Infinity
  let maxX = -Infinity,
    maxY = -Infinity

  // Stage 좌표 포함
  venueData.stage.forEach((stage) => {
    if (stage?.d) {
      const stageBounds = getPathBounds(stage.d)
      minX = Math.min(minX, stageBounds.minX)
      minY = Math.min(minY, stageBounds.minY)
      maxX = Math.max(maxX, stageBounds.maxX)
      maxY = Math.max(maxY, stageBounds.maxY)
    }
  })

  // Section 좌표 계산
  venueData.section.forEach((section) => {
    if (section.d) {
      const bounds = getPathBounds(section.d)
      minX = Math.min(minX, bounds.minX)
      minY = Math.min(minY, bounds.minY)
      maxX = Math.max(maxX, bounds.maxX)
      maxY = Math.max(maxY, bounds.maxY)
    }
  })

  const padding = 20
  const width = maxX - minX + padding * 2
  const height = maxY - minY + padding * 2

  return `${minX - padding} ${minY - padding} ${width} ${height}`
}

/**
 * SVG path에서 실제 경계 상자(bounding box)의 정확한 중심점 계산
 * @param pathData
 * @returns
 */
export const calculateTextPosition = (pathData?: string) => {
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
