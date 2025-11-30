import Link from "next/link"
import { MapPin } from "lucide-react"
import { Venues } from "@/lib/schemas/venues"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResultCardProps {
  venue: Venues
}

const SearchResultCard = ({ venue }: SearchResultCardProps) => {
  return (
    <Link key={venue.id} href={`/venues/${venue.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={venue.image_url}
            alt={venue.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <h3 className="mb-2 text-base sm:text-lg">{venue.name}</h3>
          <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{venue.address}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default SearchResultCard
