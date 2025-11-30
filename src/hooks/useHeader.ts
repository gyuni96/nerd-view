"use client"

import { useHeaderStore } from "@/store/useHeaderStore"
import { useEffect } from "react"

export const useHeader = (title: string, description: string) => {
  const setHeader = useHeaderStore((state) => state.setHeader)
  const resetHeader = useHeaderStore((state) => state.resetHeader)

  useEffect(() => {
    if (title) {
      setHeader(title, description)
    }

    return () => {
      resetHeader()
    }
  }, [title, description, setHeader, resetHeader])
}
