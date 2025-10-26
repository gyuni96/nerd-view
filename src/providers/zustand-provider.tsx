"use client"

import { useRef } from "react"

interface ZustandProviderProps {
  children: React.ReactNode
}

/**
 * Zustand Provider Component
 *
 * Zustand는 기본적으로 provider가 필요하지 않지만,
 * SSR 환경에서 hydration mismatch를 방지하기 위해
 * 초기화 로직을 관리할 수 있습니다.
 */
export function ZustandProvider({ children }: ZustandProviderProps) {
  const initialized = useRef(false)

  if (!initialized.current) {
    // 여기서 초기 상태 설정이나 초기화 로직을 실행할 수 있습니다
    // 예: 로컬 스토리지에서 데이터 복원 등
    initialized.current = true
  }

  return <>{children}</>
}
