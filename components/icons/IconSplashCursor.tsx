import { type SVGProps } from 'react'

export function IconSplashCursor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name='icon-splash-cursor'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 79.86 51.14'
      {...props}
    >
      {/* Background */}
      <rect
        x={0.53}
        y={0.5}
        width={78.83}
        height={50.14}
        rx={3.5}
        ry={3.5}
        fill='#f0f0f0'
        className="dark:fill-[#1d2b3f]"
      />
      <path
        d='M75.86 1c1.65 0 3 1.35 3 3v43.14c0 1.65-1.35 3-3 3H4.03c-1.65 0-3-1.35-3-3V4c0-1.65 1.35-3 3-3h71.83m0-1H4.03c-2.21 0-4 1.79-4 4v43.14c0 2.21 1.79 4 4 4h71.83c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4z'
        fill='#d9d9d9'
        className="dark:fill-[#0d1628]"
      />
      
      {/* Cursor pointer */}
      <path
        d='M15 10 L15 35 L25 25 L20 23 L30 13 L28 8 L18 18 L20 20 Z'
        fill='#333'
        className="dark:fill-[#fff]"
        opacity={0.8}
      />
      
      {/* Splash particles/ripples */}
      <circle cx={20} cy={20} r={2} fill='#3b82f6' opacity={0.6} />
      <circle cx={25} cy={18} r={1.5} fill='#8b5cf6' opacity={0.5} />
      <circle cx={18} cy={25} r={1.5} fill='#ec4899' opacity={0.5} />
      <circle cx={28} cy={22} r={1} fill='#10b981' opacity={0.4} />
      <circle cx={22} cy={28} r={1} fill='#f59e0b' opacity={0.4} />
      
      {/* Fluid wave effect */}
      <path
        d='M35 20 Q45 15, 55 20 T75 20'
        stroke='#3b82f6'
        strokeWidth={1.5}
        fill='none'
        opacity={0.4}
        className="dark:opacity-60"
      />
      <path
        d='M35 25 Q45 20, 55 25 T75 25'
        stroke='#8b5cf6'
        strokeWidth={1.5}
        fill='none'
        opacity={0.3}
        className="dark:opacity-50"
      />
      
      {/* Additional particles */}
      <circle cx={40} cy={15} r={1.5} fill='#3b82f6' opacity={0.5} />
      <circle cx={50} cy={12} r={1} fill='#8b5cf6' opacity={0.4} />
      <circle cx={60} cy={18} r={1.5} fill='#ec4899' opacity={0.5} />
      <circle cx={65} cy={15} r={1} fill='#10b981' opacity={0.4} />
      
      {/* Bottom area - more fluid effects */}
      <ellipse
        cx={45}
        cy={35}
        rx={8}
        ry={4}
        fill='#3b82f6'
        opacity={0.2}
        className="dark:opacity-30"
      />
      <ellipse
        cx={50}
        cy={38}
        rx={6}
        ry={3}
        fill='#8b5cf6'
        opacity={0.15}
        className="dark:opacity-25"
      />
    </svg>
  )
}
