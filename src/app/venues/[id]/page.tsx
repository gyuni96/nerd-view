import { VenueViewer } from "@/components/venue"

interface VenueDetailPageProps {
  params: {
    id: string
  }
}

const VenueDetailPage = async ({ params }: VenueDetailPageProps) => {
  // console.log(searchParams)

  const { id } = await params

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">사용 방법</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 아래 공연장 구역을 클릭하면 상세 좌석 배치를 볼 수 있습니다</li>
          </ul>
        </div>
      </div>

      {/* 공연장 뷰어 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">공연장 좌석 배치도</h2>
        <VenueViewer venueId={id} />
      </div>
    </div>
  )
}

export default VenueDetailPage
