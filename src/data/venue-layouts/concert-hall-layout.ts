import { VenueLayout } from "@/types/venue-layout"

/**
 * 콘서트홀 레이아웃
 * layout.html에서 변환된 SVG path 기반 좌석 배치도
 */
export const concertHallLayout: VenueLayout = {
  id: "concert-hall-01",
  venueId: "concert-hall",
  name: "콘서트홀 레이아웃",
  type: "hall",
  viewBox: "10 25 310 300",
  sections: [
    // ========== 중앙 구역 (무대 정면) ==========
    {
      id: "center-1-1",
      name: "중앙1-1",
      type: "seated",
      layout: "path",
      labelX: 104,
      labelY: 90,
      pathData: "M111 79L97 86.0909V103H111V79Z",
      color: "#4ECDC4",
    },
    {
      id: "center-1-2",
      name: "중앙1-2",
      type: "seated",
      layout: "path",
      pathData: "M112.5 79 H134.5 V103 H112.5 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-1-3",
      name: "중앙1-3",
      type: "seated",
      layout: "path",
      pathData: "M137 79 H159 V103 H137 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-1-4",
      name: "중앙1-4",
      type: "seated",
      layout: "path",
      pathData: "M173 79 H195 V103 H173 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-1-5",
      name: "중앙1-5",
      type: "seated",
      layout: "path",
      pathData: "M197 79 H219 V103 H197 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-1-6",
      name: "중앙1-6",
      type: "seated",
      layout: "path",
      pathData: "M221 79L235 86.0909V103H221V79Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-1",
      name: "중앙2-1",
      type: "seated",
      layout: "path",
      pathData: "M97 106 H111 V130 H97 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-2",
      name: "중앙2-2",
      type: "seated",
      layout: "path",
      pathData: "M112.5 106V166L120 166L134.5 149.5L134.5 106H112.5Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-3",
      name: "중앙2-3",
      type: "seated",
      layout: "path",
      pathData: "M137 106V147.5L151 132V106H137Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-4",
      name: "중앙2-4",
      type: "seated",
      layout: "path",
      pathData: "M195 106V147.5L181 132V106H195Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-5",
      name: "중앙2-5",
      type: "seated",
      layout: "path",
      pathData: "M219 106V166L211 166L197 149.5L197 106H219Z",
      color: "#4ECDC4",
    },
    {
      id: "center-2-6",
      name: "중앙2-6",
      type: "seated",
      layout: "path",
      pathData: "M221 106 H235 V130 H221 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-3-1",
      name: "중앙3-1",
      type: "seated",
      layout: "path",
      pathData: "M156.5 138L130.5 170V175H152V170H164.5V138H156.5Z",
      color: "#4ECDC4",
    },
    {
      id: "center-3-2",
      name: "중앙3-2",
      type: "seated",
      layout: "path",
      pathData: "M176 138L202 170V175H180.5V170H168V138H176Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-1",
      name: "중앙4-1",
      type: "seated",
      layout: "path",
      pathData: "M97 187 H111 V217 H97 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-2",
      name: "중앙4-2",
      type: "seated",
      layout: "path",
      pathData: "M113 187 H135 V217 H113 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-3",
      name: "중앙4-3",
      type: "seated",
      layout: "path",
      pathData: "M137.5 187V217H154V212H164V192.5H152V187H137.5Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-4",
      name: "중앙4-4",
      type: "seated",
      layout: "path",
      pathData: "M195 187V217H178.5V212H168.5V192.5H180.5V187H195Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-5",
      name: "중앙4-5",
      type: "seated",
      layout: "path",
      pathData: "M219 187 H197 V217 H219 Z",
      color: "#4ECDC4",
    },
    {
      id: "center-4-6",
      name: "중앙4-6",
      type: "seated",
      layout: "path",
      pathData: "M235 187 H221 V217 H235 Z",
      color: "#4ECDC4",
    },

    // ========== 좌측 구역 (곡선형) ==========
    {
      id: "left-1",
      name: "좌측1열",
      type: "seated",
      layout: "path",
      pathData:
        "M31 62.5C37.5102 47.8791 41.8724 39.916 51.5 26.5L68.5 38C61.9379 49.734 58.6413 56.9192 54.5 70.5L31 62.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-2",
      name: "좌측2열",
      type: "seated",
      layout: "path",
      pathData:
        "M30 65.5C23.6141 80.5049 20.9339 89.7629 18 107.5H51C50.6761 93.786 51.4009 86.203 54 73L30 65.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-3",
      name: "좌측3열",
      type: "seated",
      layout: "path",
      pathData: "M17.503 110C15.1215 122.729 14.7352 129.979 15.003 143H50.503V110H17.503Z",
      color: "#FF6B6B",
    },
    {
      id: "left-4",
      name: "좌측4열",
      type: "seated",
      layout: "path",
      pathData: "M14.5 146C14.8759 159.424 15.622 166.765 17.5 179.5H51L50.5 146H14.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-5",
      name: "좌측5열",
      type: "seated",
      layout: "path",
      pathData:
        "M18 181.5C21.1552 199.016 23.8841 208.26 30 224L54.5 215C51.6582 201.539 50.6588 194.174 51 181.5H18Z",
      color: "#FF6B6B",
    },
    {
      id: "left-6",
      name: "좌측6열",
      type: "seated",
      layout: "path",
      pathData:
        "M55 217.5L31 226C36.2977 239.818 41.3093 248.032 51.5 263L69 251C61.0693 236.899 57.3927 229.278 55 217.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-7",
      name: "좌측7열",
      type: "seated",
      layout: "path",
      pathData:
        "M70.5 253.5L53.5 265C63.4369 278.211 69.5143 284.833 82.5 295L95 280C84.699 270.697 79.3681 264.947 70.5 253.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-8",
      name: "좌측8열",
      type: "seated",
      layout: "path",
      pathData:
        "M97 281.5L85 297C97.9701 306.74 105.975 311.099 121.5 317L128 298C114.908 293.35 108.572 289.625 97 281.5Z",
      color: "#FF6B6B",
    },
    {
      id: "left-9",
      name: "좌측9열",
      type: "seated",
      layout: "path",
      pathData:
        "M131 299L124.5 318C138.978 323.223 148.066 324.729 164 325V304.5C151.059 303.417 144.113 302.213 131 299Z",
      color: "#FF6B6B",
    },

    // ========== 우측 구역 (곡선형) ==========
    {
      id: "right-1",
      name: "우측1열",
      type: "seated",
      layout: "path",
      pathData:
        "M168 304.5V325C185.221 324.604 194.073 323.208 208 318L201 299C187.82 303.035 181.04 304.147 168 304.5Z",
      color: "#95A5A6",
    },
    {
      id: "right-2",
      name: "우측2열",
      type: "seated",
      layout: "path",
      pathData:
        "M203.5 298L211 317C226.216 311.502 233.853 307.217 247.5 297L235 281.5C222.995 290.208 216.251 293.655 203.5 298Z",
      color: "#95A5A6",
    },
    {
      id: "right-3",
      name: "우측3열",
      type: "seated",
      layout: "path",
      pathData:
        "M237.5 280L249.5 295.5C262.273 285.445 268.832 278.897 279 265L262 253.5C253.841 265.063 248.322 270.825 237.5 280Z",
      color: "#95A5A6",
    },
    {
      id: "right-4",
      name: "우측4열",
      type: "seated",
      layout: "path",
      pathData:
        "M278 219C274.405 230.629 270.779 237.326 263.5 251L281 263C290.034 249.411 294.426 241.428 301 226.5L278 219Z",
      color: "#95A5A6",
    },
    {
      id: "right-5",
      name: "우측5열",
      type: "seated",
      layout: "path",
      pathData:
        "M281.5 181.5C281.767 198.08 280.82 205.197 278.5 216L302.5 223.5C308.67 207.75 311.003 198.619 313.5 181.5H281.5Z",
      color: "#95A5A6",
    },
    {
      id: "right-6",
      name: "우측6열",
      type: "seated",
      layout: "path",
      pathData: "M281 178V145H307V164.5H315.5C315.5 168.5 315 173.5 314 178H281Z",
      color: "#95A5A6",
    },
    {
      id: "right-7",
      name: "우측7열",
      type: "seated",
      layout: "path",
      pathData: "M281.5 110V143H307.5V123.5H316C316 119.5 315.5 114.5 314.5 110H281.5Z",
      color: "#95A5A6",
    },
    {
      id: "right-8",
      name: "우측8열",
      type: "seated",
      layout: "path",
      pathData:
        "M278.5 73C280.698 87.2088 281.461 94.8544 282 107.5H314C310.801 89.3034 308.002 79.938 302 65L278.5 73Z",
      color: "#95A5A6",
    },
    {
      id: "right-9",
      name: "우측9열",
      type: "seated",
      layout: "path",
      pathData:
        "M263.5 38C270.652 50.1057 273.469 57.2823 278 70.5L301 62.5C294.328 47.2426 289.938 39.1713 280.5 26L263.5 38Z",
      color: "#95A5A6",
    },

    // ========== 좌측 내부 구역 ==========
    {
      id: "left-inner-1",
      name: "좌측내부1",
      type: "seated",
      layout: "path",
      pathData:
        "M71.5 39C63.9653 50.531 60.8761 57.7466 57.5 71.5L82.5 79.5C85.4083 67.3495 87.6726 61.2882 93 52L71.5 39Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-2",
      name: "좌측내부2",
      type: "seated",
      layout: "path",
      pathData:
        "M56.5038 74C53.7943 85.157 53.2174 92.5432 53.5038 107H81.0039C80.716 97.5583 80.8098 92.1448 82.0039 82L56.5038 74Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-3",
      name: "좌측내부3",
      type: "seated",
      layout: "path",
      pathData: "M53 110 H81 V143 H53 Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-4",
      name: "좌측내부4",
      type: "seated",
      layout: "path",
      pathData: "M53 146 H81 V179.5 H53 Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-5",
      name: "좌측내부5",
      type: "seated",
      layout: "path",
      pathData:
        "M53.5027 181.5C53.052 194.801 53.7736 201.834 56.0027 214L81.5027 206C80.7821 195.739 80.6275 190.313 81.0027 181.5H53.5027Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-6",
      name: "좌측내부6",
      type: "seated",
      layout: "path",
      pathData:
        "M57 217L82 209C84.5948 219.555 87.0715 225.444 92 236L71 249C63.9358 236.939 60.7224 229.978 57 217Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-7",
      name: "좌측내부7",
      type: "seated",
      layout: "path",
      pathData:
        "M93.5 238L72.5 251.5C80.0081 262.597 85.4095 268.086 96 277L111 259C104.144 252.061 100.344 247.607 93.5 238Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-8",
      name: "좌측내부8",
      type: "seated",
      layout: "path",
      pathData:
        "M113.5 260.5L98.5 278.5C109.028 286.405 115.587 290.084 128 295L136.5 274C127.671 269.837 122.856 266.789 113.5 260.5Z",
      color: "#FFD93D",
    },
    {
      id: "left-inner-9",
      name: "좌측내부9",
      type: "seated",
      layout: "path",
      pathData:
        "M139 275L131.5 296C143.581 299.493 151.409 300.664 164.5 301.5V279C154.002 278.266 149.2 277.391 139 275Z",
      color: "#FFD93D",
    },

    // ========== 우측 내부 구역 ==========
    {
      id: "right-inner-1",
      name: "우측내부1",
      type: "seated",
      layout: "path",
      pathData:
        "M193 275C182.689 277.624 176.732 278.47 167.5 279V301.5C179.765 301.256 187.341 299.839 200.5 296L193 275Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-2",
      name: "우측내부2",
      type: "seated",
      layout: "path",
      pathData:
        "M195.5 274.5L203.5 295C215.335 291.099 221.995 287.879 233.5 279L219.5 261C210.105 267.436 205.661 270.279 195.5 274.5Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-3",
      name: "우측내부3",
      type: "seated",
      layout: "path",
      pathData: "M221.5 259.5L236 277.5L248 266L237 256L234 259L228.5 253.5L221.5 259.5Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-4",
      name: "우측내부4",
      type: "seated",
      layout: "path",
      pathData:
        "M251 189C250.725 204.015 249.522 210.566 246.5 221L272 228C275.874 218.212 277.104 211.845 278.5 199.5H268V189H251Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-5",
      name: "우측내부5",
      type: "seated",
      layout: "path",
      pathData:
        "M246 222.5C242.84 230.842 240.114 235.612 235 244.5L242 250.5L238.5 254.5L249.5 264.5C259.43 253.471 264.667 245.628 271.5 230L246 222.5Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-6",
      name: "우측내부6",
      type: "seated",
      layout: "path",
      pathData: "M251 171 H268 V187 H251 Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-7",
      name: "우측내부7",
      type: "seated",
      layout: "path",
      pathData: "M251 102 H268 V118 H251 Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-8",
      name: "우측내부8",
      type: "seated",
      layout: "path",
      pathData:
        "M240.5 53C244.511 61.8726 247.13 67.6554 249.5 78L275.5 71C271.691 57.976 267.755 50.4207 261.5 39L240.5 53Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-9",
      name: "우측내부9",
      type: "seated",
      layout: "path",
      pathData:
        "M276 73L250 80C250.983 87.7211 251.651 92.0581 251.5 99.5H268V90H278C277.511 83.0516 277.457 79.3453 276 73Z",
      color: "#A8E6CF",
    },
    {
      id: "right-inner-10",
      name: "우측내부10",
      type: "seated",
      layout: "path",
      pathData: "M251 119 H268 V169 H251 Z",
      color: "#A8E6CF",
    },
  ],
  totalCapacity: 64,
}
