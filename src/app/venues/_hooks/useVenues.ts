'use client"'

import { getVenueInfo } from "@/app/actions/venueAction"
import { useHeader } from "@/hooks/useHeader"
import { Venues, VenueSections } from "@/lib/schemas/venues"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export type TransformedVenueData = {
  stage: VenueSections[]
  section: VenueSections[]
}

type UseVenuesReturn = {
  data: TransformedVenueData
  isLoading: boolean
  isError: boolean
}

export const useVenues = (venueId: string): UseVenuesReturn => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", venueId],
    queryFn: () => getVenueInfo(venueId),
    staleTime: 5 * 60 * 1000, // 5분
  })

  // 헤더 업데이트
  useHeader(data?.name, data?.address)

  const transformedData = useMemo(() => {
    if (!data?.sections)
      return { stage: [], section: [] } as { stage: VenueSections[]; section: VenueSections[] }

    return data.sections.reduce(
      (acc: TransformedVenueData, cur: VenueSections) => {
        if (cur?.type === "stage") {
          acc.stage.push(cur)
        }
        if (cur?.type === "section") {
          acc.section.push(cur)
        }
        return acc
      },
      { stage: [] as VenueSections[], section: [] as VenueSections[] }
    )
  }, [data?.sections])

  return { data: transformedData, isLoading, isError }
}
