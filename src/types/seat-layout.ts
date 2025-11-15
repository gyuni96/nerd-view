export interface Position {
  x: number
  y: number
}

export interface RowDefinition {
  rowLabel: string
  startSeatNum: number
  seatCount: number
  startPosition: Position
  seatSpacing: number
  aisleAfter: number[]
}

export interface SeatLayout {
  type: string
  aisleWidth: number
  rowDefinitions: RowDefinition[]
}

export interface Stage {
  x: number
  y: number
  d: string // SVG path data
}

export interface Section {
  id: string
  name: string
  d: string // SVG path data
  seatLayout: SeatLayout[]
}

export interface VenueData {
  stage: Stage
  section: Section[]
}

export interface SeatInfo {
  sectionId: string
  rowLabel: string
  seatNumber: number
  position: Position
  isAisle?: boolean
}
