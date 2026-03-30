import { type SVGProps } from 'react'

export function IconSplashCursorDisabled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name='icon-splash-cursor-disabled'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 79.86 51.14'
      {...props}
    >
      {/* Background - muted */}
      <rect
        x={0.53}
        y={0.5}
        width={78.83}
        height={50.14}
        rx={3.5}
        ry={3.5}
        fill='#f0f0f0'
        className="dark:fill-[#1d2b3f]"
        opacity={0.5}
      />
      <path
        d='M75.86 1c1.65 0 3 1.35 3 3v43.14c0 1.65-1.35 3-3 3H4.03c-1.65 0-3-1.35-3-3V4c0-1.65 1.35-3 3-3h71.83m0-1H4.03c-2.21 0-4 1.79-4 4v43.14c0 2.21 1.79 4 4 4h71.83c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4z'
        fill='#d9d9d9'
        className="dark:fill-[#0d1628]"
        opacity={0.5}
      />
      
      {/* Cursor pointer - muted */}
      <path
        d='M15 10 L15 35 L25 25 L20 23 L30 13 L28 8 L18 18 L20 20 Z'
        fill='#999'
        className="dark:fill-[#666]"
        opacity={0.5}
      />
      
      {/* Splash particles/ripples - muted */}
      <circle cx={20} cy={20} r={2} fill='#999' opacity={0.3} />
      <circle cx={25} cy={18} r={1.5} fill='#999' opacity={0.25} />
      <circle cx={18} cy={25} r={1.5} fill='#999' opacity={0.25} />
      <circle cx={28} cy={22} r={1} fill='#999' opacity={0.2} />
      <circle cx={22} cy={28} r={1} fill='#999' opacity={0.2} />
      
      {/* Fluid wave effect - muted */}
      <path
        d='M35 20 Q45 15, 55 20 T75 20'
        stroke='#999'
        strokeWidth={1.5}
        fill='none'
        opacity={0.2}
      />
      <path
        d='M35 25 Q45 20, 55 25 T75 25'
        stroke='#999'
        strokeWidth={1.5}
        fill='none'
        opacity={0.15}
      />
      
      {/* Additional particles - muted */}
      <circle cx={40} cy={15} r={1.5} fill='#999' opacity={0.25} />
      <circle cx={50} cy={12} r={1} fill='#999' opacity={0.2} />
      <circle cx={60} cy={18} r={1.5} fill='#999' opacity={0.25} />
      <circle cx={65} cy={15} r={1} fill='#999' opacity={0.2} />
      
      {/* Bottom area - more fluid effects - muted */}
      <ellipse
        cx={45}
        cy={35}
        rx={8}
        ry={4}
        fill='#999'
        opacity={0.1}
      />
      <ellipse
        cx={50}
        cy={38}
        rx={6}
        ry={3}
        fill='#999'
        opacity={0.08}
      />
      
      {/* Diagonal line to indicate disabled */}
      <line
        x1={10}
        y1={8}
        x2={70}
        y2={43}
        stroke='#999'
        strokeWidth={2}
        opacity={0.6}
        strokeLinecap='round'
      />
    </svg>
  )
}
