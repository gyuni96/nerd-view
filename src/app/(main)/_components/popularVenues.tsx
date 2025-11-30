"use client"

import Link from "next/link"
import { usePopularVenues } from "../_hooks/usePopularKeyword"

const PopularVenues = () => {
  const { data: venues, isError } = usePopularVenues()

  if (isError || !venues || venues.length === 0) {
    return null
  }

  return (
    <div className="text-xs sm:text-sm px-4">
      <div className="mb-2 text-center">
        <span className="text-muted-foreground">인기 검색:</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            href={`/venues/${venue.id}`}
            className="text-primary hover:underline px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors"
          >
            {venue.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularVenues
