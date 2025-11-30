'use client"'

import { getVenueById, getVenueSection } from "@/app/actions/venueAction"
import { useHeader } from "@/hooks/useHeader"
import { Venues, VenueSections } from "@/lib/schemas/venues"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export const useVenues = (venueId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues"],
    queryFn: () => getVenueSection(venueId),
    staleTime: 5 * 60 * 1000, // 5분
  })

  const { data: venue } = useQuery({
    queryKey: ["venueSections", venueId],
    queryFn: () => getVenueById(venueId),
    staleTime: 5 * 60 * 1000, // 5분
  })

  const title = venue?.name || ""
  const description = venue?.address || ""

  // 헤더 업데이트
  useHeader(title, description)

  const transformedData = useMemo(() => {
    if (!data)
      return { stage: [], section: [] } as { stage: VenueSections[]; section: VenueSections[] }

    return data.reduce(
      (acc, cur: VenueSections) => {
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
  }, [data])

  return { data: transformedData, isLoading, isError }
}
