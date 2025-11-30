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
