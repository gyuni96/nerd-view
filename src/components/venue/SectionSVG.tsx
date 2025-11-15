'use client';

import { Section } from '@/types/seat-layout';

interface SectionSVGProps {
  section: Section;
  isSelected?: boolean;
  onClick?: (section: Section) => void;
  className?: string;
}

export default function SectionSVG({
  section,
  isSelected = false,
  onClick,
  className = ''
}: SectionSVGProps) {
  const handleClick = () => {
    onClick?.(section);
  };

  // SVG path에서 대략적인 중심점 계산
  const calculateTextPosition = (pathData: string) => {
    // 간단한 사각형 path인 경우 중심점 계산
    const coords = pathData.match(/[0-9]+/g);
    if (coords && coords.length >= 4) {
      const x1 = parseInt(coords[0]);
      const y1 = parseInt(coords[1]);
      const x2 = parseInt(coords[2]);
      const y2 = parseInt(coords[3]);
      return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
      };
    }
    return { x: 0, y: 0 };
  };

  const textPos = calculateTextPosition(section.d);

  return (
    <g
      className={`cursor-pointer transition-all duration-200 ${className}`}
      onClick={handleClick}
    >
      <path
        d={section.d}
        fill={isSelected ? '#3b82f6' : '#e5e7eb'}
        stroke={isSelected ? '#1d4ed8' : '#9ca3af'}
        strokeWidth={isSelected ? 2 : 1}
        className="hover:fill-blue-200 hover:stroke-blue-400"
      />
      <text
        x={textPos.x}
        y={textPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-700 text-sm font-medium pointer-events-none"
        style={{ userSelect: 'none' }}
      >
        {section.name}
      </text>
    </g>
  );
}